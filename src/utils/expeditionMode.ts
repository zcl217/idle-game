import { cloneDeep, uniqueId } from "lodash";
import { CELL_HEIGHT, CELL_WIDTH, MAP_1, MAP_2 } from "~/constants/military/maps";
import { UNIT_STATES } from "~/constants/military/sprites";
import type { ICoordinates } from "~/interfaces/common";
import type { IExpeditionCell } from "~/interfaces/military/expeditionGrid";
import type { IMap } from "~/interfaces/military/map";
import type { ISprite } from "~/interfaces/military/sprite";
import { tweened, spring } from "svelte/motion";
import { get } from 'svelte/store';
import { SPRITESHEET_MAP } from "~/constants/military/spriteSheetMap";
import type { IProjectile } from "~/interfaces/military/projectile";
import { UNIT_PROJECTILES } from "~/constants/military/projectiles";
import { ENEMY_SPAWN_LIST } from "~/constants/military/enemySpawnList";
import { removedEnemyUnitCount } from "~/store/military";

export const initializeGrid = (mapType: number): IExpeditionCell[][] => {
    const grid: IExpeditionCell[][] = [];
    let cellCount = 0;
    const backgroundImage = `url("sprites/map${mapType}/tile`;
    for (let y = 0; y < 7; y++) {
        const row: IExpeditionCell[] = [];
        for (let x = 0; x < 9; x++) {
            const cell: IExpeditionCell = {
                isPath: false,
                isDeployable: false,
                startOfPath: isStart(y, x, mapType),
                endOfPath: isEnd(y, x, mapType),
                coordinates: {
                    row: y,
                    col: x
                },
                enemyUnitList: [],
                enemyUnitArriving: false,
                backgroundImage: backgroundImage + getCellImagePath(cellCount) + '.png")'
            };
            row.push(cell);
            cellCount++;
        }
        grid.push(row);
    }
    return grid;
};

const isStart = (row: number, col: number, mapType: number): boolean => {
    let startCoordinates = [];
    switch (mapType) {
        case 1:
            startCoordinates = MAP_1.start;
            break;
        case 2:
            startCoordinates = MAP_2.start;
            break;
        default:
            return false;
    }
    for (const coordinates of startCoordinates) {
        if (coordinates.row === row && coordinates.col === col)
            return true;
    }
    return false;
}

const isEnd = (row: number, col: number, mapType: number): boolean => {
    let endCoordinates = [];
    switch (mapType) {
        case 1:
            endCoordinates = MAP_1.end;
            break;
        case 2:
            endCoordinates = MAP_2.end;
            break;
        default:
            return false;
    }
    for (const coordinates of endCoordinates) {
        if (coordinates.row === row && coordinates.col === col)
            return true;
    }
    return false;
}

const getCellImagePath = (cellCount: number): string => {
    return ("00" + cellCount).slice(-3);
}

export const setGridPath = (grid: IExpeditionCell[][], mapType: number): void => {
    let mapLayout: IMap = {} as IMap;
    switch (mapType) {
        case 1:
            mapLayout = MAP_1;
            break;
        case 2:
            mapLayout = MAP_2;
            break;
        case 3:
            break;
    }
    const { path, undeployable } = mapLayout;
    for (const p of path) {
        grid[p.row][p.col].isPath = true;
    }
    for (const p of undeployable) {
        grid[p.row][p.col].undeployableTerrain = true;
    }
};

export const initializeEnemies = (stage: string, enemyUnits: ISprite[], grid: IExpeditionCell[][]): number => {
    let totalEnemies = 0;
    for (const enemySpawnInfo of ENEMY_SPAWN_LIST[stage]) {
        totalEnemies += enemySpawnInfo.amount;
        setTimeout(() => {
            const enemy = cloneDeep(enemySpawnInfo.enemyUnit);
            enemy.state.unitPath = enemySpawnInfo.path;
            const { row, col } = enemy.state.unitPath[0];
            const startingCell = grid[row][col];
            createEnemies(enemy,
                enemyUnits,
                startingCell,
                enemySpawnInfo.intervalDelay,
                enemySpawnInfo.amount);
        }, enemySpawnInfo.spawnDelay);
    }
    return totalEnemies;
}

function createEnemies(
    enemy: ISprite, enemyUnits: ISprite[], startingCell: IExpeditionCell, delay: number, remainingEnemies: number): void {
    if (remainingEnemies === 0) return;
    const newEnemy = cloneDeep(enemy);
    initializeUnitPosition(newEnemy, newEnemy.state.unitPath[0].row, newEnemy.state.unitPath[0].col);
    newEnemy.spriteInfo.unitId = uniqueId();
    enemyUnits.push(newEnemy);
    startingCell.enemyUnitList.push(newEnemy);
    setTimeout(() => {
        createEnemies(enemy, enemyUnits, startingCell, delay, remainingEnemies - 1);
    }, delay)
}

export function initializeUnitPosition(unit: ISprite, row: number, col: number): void {
    const startingPositionX = col * CELL_WIDTH;
    const startingPositionY = row * CELL_HEIGHT;
    unit.position.positionXTweened = tweened(startingPositionX, {
        duration: unit.position.tweenedDelay || 1000
    });
    unit.position.positionYTweened = tweened(startingPositionY, {
        duration: unit.position.tweenedDelay || 1000
    })
    unit.position.coordinates = { row, col };
}

export const setLifeCount = (level: number, lifeCount: any): void => {
    // TODO: different lives based on the level
    lifeCount.set(2);
}

export const handleDamageCalculations = (
    grid: IExpeditionCell[][],
    playerUnits: ISprite[],
    enemyUnits: ISprite[],
    projectiles: IProjectile[]
): void => {
    for (const unit of playerUnits) processAttack(unit, grid, playerUnits, enemyUnits, projectiles);
    for (const unit of enemyUnits) processAttack(unit, grid, playerUnits, enemyUnits, projectiles);
};

function processAttack(
    unit: ISprite,
    grid: IExpeditionCell[][],
    playerUnits: ISprite[],
    enemyUnits: ISprite[],
    projectiles: IProjectile[]
): void {
    // console.log(unit.state.currentState);
    const target = getAttackTarget(unit, grid);
    if (!target) return;
    changeUnitState(unit, UNIT_STATES.ATTACK);

    // if unit is already attacking then skip
    // (we check currentFrame against 1 and not 0 because handleUnitAnimations is run
    // after damage calculations and unit movements, which means that anything that changes
    // the unit state will animate the attack by one frame before we end up calculating
    // the actual damage)
    if (unit.state.currentFrame !== 1) return;
    const currentCol = unit.position.coordinates.col;
    const targetCol = target.position.coordinates.col;
    unit.position.facingRight = targetCol >= currentCol;
    if (unit.spriteInfo.melee) {
        processDamageCalculation(unit.spriteInfo.damage, target, grid, playerUnits, enemyUnits);
    } else {
        // fire a projectile. when the projectile hits the enemy, that's when we calculate dmg
        if (unit.spriteInfo.isEnemy) {
            fireProjectile(unit, target, grid, playerUnits, enemyUnits, projectiles);
        } else {
            fireHomingProjectile(unit, target, projectiles);
        }
    }
}

export const processDamageCalculation = (
    damage: number,
    target: ISprite,
    grid: IExpeditionCell[][],
    playerUnits: ISprite[],
    enemyUnits: ISprite[]
): void => {
    target.state.currentHp -= damage;
    // remove sprite from cell and master list
    if (target.state.currentHp <= 0 && !target.state.isDead) {
        target.state.isDead = true;
        const targetCoordinates = target.position.coordinates;
        const targetCell: IExpeditionCell =
            grid[targetCoordinates.row][targetCoordinates.col];
        processUnitDeath(target, targetCell, playerUnits, enemyUnits);
    }
}

function fireProjectile(
    unit: ISprite,
    target: ISprite,
    grid: IExpeditionCell[][],
    playerUnits: ISprite[],
    enemyUnits: ISprite[],
    projectiles: IProjectile[]
): void {
    const newProjectile = cloneDeep(UNIT_PROJECTILES[unit.spriteInfo.unitType]);
    newProjectile.projectileId = uniqueId();
    newProjectile.homing = false;
    newProjectile.target = target;
    newProjectile.damage = unit.spriteInfo.damage;
    const projectileSpeed = calculateProjectileSpeed(
        newProjectile.speed,
        unit.position.coordinates,
        target.position.coordinates
    );
    const startingPositionX = unit.position.coordinates.col * CELL_WIDTH;
    const startingPositionY = unit.position.coordinates.row * CELL_HEIGHT;
    newProjectile.positionXTweened = tweened(startingPositionX, {
        duration: projectileSpeed
    });
    newProjectile.positionYTweened = tweened(startingPositionY, {
        duration: projectileSpeed
    });
    const targetPositionX = target.position.coordinates.col * CELL_WIDTH;
    const targetPositionY = target.position.coordinates.row * CELL_HEIGHT;
    newProjectile.positionXTweened.set(targetPositionX);
    newProjectile.positionYTweened.set(targetPositionY);
    projectiles.push(newProjectile);
}

function fireHomingProjectile(
    unit: ISprite,
    target: ISprite,
    projectiles: IProjectile[]
): void {
    const newProjectile = cloneDeep(UNIT_PROJECTILES[unit.spriteInfo.unitType]);
    newProjectile.projectileId = uniqueId();
    newProjectile.homing = true;
    newProjectile.damage = unit.spriteInfo.damage;
    newProjectile.target = target;
    const startingPositionX = unit.position.coordinates.col * CELL_WIDTH;
    const startingPositionY = unit.position.coordinates.row * CELL_HEIGHT;
    newProjectile.positionSpring = spring({ x: startingPositionX, y: startingPositionY }, {
        stiffness: 0.05,
        damping: 0.5
    });
    projectiles.push(newProjectile);
}

function calculateProjectileSpeed(
    speed: number,
    currentCoordinates: ICoordinates,
    targetCoordinates: ICoordinates
): number {
    const a = Math.pow(Math.abs(currentCoordinates.row - targetCoordinates.row), 2);
    const b = Math.pow(Math.abs(currentCoordinates.col - targetCoordinates.col), 2);
    const c = Math.floor(Math.sqrt(a + b)) || 0;
    return speed * c;
}

function processUnitDeath(
    target: ISprite,
    targetCell: IExpeditionCell,
    playerUnits: ISprite[],
    enemyUnits: ISprite[]
): void {
    if (target.spriteInfo.isEnemy) {
        removeFromUnitList(target, targetCell.enemyUnitList);
        removeFromUnitList(target, enemyUnits);
        removedEnemyUnitCount.increment();
    } else {
        targetCell.playerUnit = undefined;
        removeFromUnitList(target, playerUnits);
    }
}

function removeFromUnitList(target: ISprite, unitList: ISprite[]): void {
    for (let a = unitList.length - 1; a >= 0; a--) {
        if (unitList[a].spriteInfo.unitId === target.spriteInfo.unitId) {
            unitList.splice(a, 1);
            return;
        }
    }
}

const getAttackTarget = (curUnit: ISprite, grid: IExpeditionCell[][]): ISprite | undefined => {
    const coordinates = curUnit.position.coordinates;
    let coordinatesInRange: ICoordinates[] = [];
    if (curUnit.spriteInfo.melee) {
        coordinatesInRange = getAdjacentCoordinates(coordinates, grid, true);
    } else {
        coordinatesInRange = getCoordinateRange(
            coordinates,
            curUnit.spriteInfo.attackRange,
            grid
        );
    }
    if (curUnit.spriteInfo.isEnemy) {
        for (const coordinate of coordinatesInRange) {
            const currentCell = grid[coordinate.row][coordinate.col];
            if (currentCell.playerUnit) return currentCell.playerUnit;
        }
    } else {
        // return the first enemy unit found in the coordinates within attack range
        for (const coordinate of coordinatesInRange) {
            const currentCell = grid[coordinate.row][coordinate.col];
            if (currentCell.enemyUnitList.length > 0)
                return currentCell.enemyUnitList[0];
        }
    }
};

const getAdjacentCoordinates = (
    coordinates: ICoordinates,
    grid: IExpeditionCell[][],
    isMelee: boolean
): ICoordinates[] => {
    const coordinateList: ICoordinates[] = [];
    const { row, col } = coordinates;
    coordinateList.push(
        {
            row: row - 1,
            col: col,
        },
        {
            row: row + 1,
            col: col,
        },
        {
            row: row,
            col: col - 1,
        },
        {
            row: row,
            col: col + 1,
        }
    );
    return pruneCoordinateList(coordinateList, grid, isMelee);
};

const getCoordinateRange = (
    coordinates: ICoordinates,
    radius: number,
    grid: IExpeditionCell[][],
): ICoordinates[] => {
    const coordinateList: ICoordinates[] = [];
    const { row, col } = coordinates;

    for (let rangeX = (radius * -1); rangeX <= radius; rangeX++) {
        for (let rangeY = (radius * -1); rangeY <= radius; rangeY++) {
            coordinateList.push({
                row: row + rangeY,
                col: col + rangeX,
            });
        }
    }

    return pruneCoordinateList(coordinateList, grid);
};

function pruneCoordinateList(
    coordinateList: ICoordinates[],
    grid: IExpeditionCell[][],
    isMelee = false
): ICoordinates[] {
    const prunedList: ICoordinates[] = [];
    for (const coordinates of coordinateList) {
        if (
            coordinates.row < 0 ||
            coordinates.col < 0 ||
            coordinates.row >= grid.length ||
            coordinates.col >= grid[0].length
        ) continue;
        if (isMelee && !grid[coordinates.row][coordinates.col].isPath) continue;
        prunedList.push(coordinates);
    }
    return prunedList;
}

export const handleEnemyMovements = (enemyUnits: ISprite[], grid: IExpeditionCell[][], lifeCount: any): void => {
    for (const unit of enemyUnits) {
        const unitPath: ICoordinates[] = unit.state.unitPath;
        if (
            // remove -1 if we're doing currentPathIndex++ instead of prefix
            unit.state.currentPathIndex >= unitPath.length - 1 ||
            unit.state.currentState !== UNIT_STATES.IDLE
        ) continue;

        changeUnitState(unit, UNIT_STATES.MOVE);
        const previousCol = unitPath[unit.state.currentPathIndex].col;
        const { row, col } = unitPath[unit.state.currentPathIndex + 1];
        unit.position.facingRight = col >= previousCol;
        // attack the blocking player unit
        if (grid[row][col].playerUnit) {
            changeUnitState(unit, UNIT_STATES.ATTACK);
        } else {

            grid[row][col].enemyUnitArriving = true;
            unit.position.positionXTweened.set(col * CELL_WIDTH);
            unit.position.positionYTweened.set(row * CELL_HEIGHT).then(() => {
                handleCompletedMovement(unit, grid, enemyUnits, lifeCount);
                grid[row][col].enemyUnitArriving = false;
                unit.position.coordinates = { row, col };
            });
            unit.state.currentPathIndex++
        }
    }
};

function handleCompletedMovement(
    unit: ISprite,
    grid: IExpeditionCell[][],
    enemyUnits: ISprite[],
    lifeCount: any
) {
    // transfer the unit from the previous cell (where it came from) to the current cell
    const previousCellCoordinates = unit.state.unitPath[unit.state.currentPathIndex - 1];
    const previousCell = grid[previousCellCoordinates.row][previousCellCoordinates.col];
    // if the unit doesn't exist in the previous list, then it has died
    if (!unitExistsInList(unit, previousCell.enemyUnitList)) return;
    removeFromUnitList(unit, previousCell.enemyUnitList);

    const currentCellCoordinates = unit.state.unitPath[unit.state.currentPathIndex];
    const currentCell = grid[currentCellCoordinates.row][currentCellCoordinates.col];
    //console.log(unit.state.currentPathIndex + " " + unit.state.unitPath.length);
    if (unit.state.currentPathIndex >= unit.state.unitPath.length - 1) {
        lifeCount.update((n: number) => n > 0 ? n - 1 : n);
        removedEnemyUnitCount.increment();
        removeFromUnitList(unit, enemyUnits);
    } else {
        currentCell.enemyUnitList.push(unit);
        changeUnitState(unit, UNIT_STATES.IDLE);
    }
}

function unitExistsInList(target: ISprite, list: ISprite[]) {
    for (const unit of list) {
        if (unit.spriteInfo.unitId === target.spriteInfo.unitId) return true;
    }
    return false;
}

export const handleUnitAnimations = (playerUnits: ISprite[], enemyUnits: ISprite[], frame: number): void => {
    for (const unit of playerUnits) animateUnit(unit, frame);
    for (const unit of enemyUnits) animateUnit(unit, frame);
};

const animateUnit = (unit: ISprite, frame: number) => {
    // animate units based on their animation speed
    let animationSpeed = 1;
    animationSpeed = getAnimationSpeed(unit);
    if (frame % animationSpeed !== 0) return;
    let frameList: ICoordinates[] = [];
    if (unit.state.currentFrame === 0 ||
        unit.state.currentFrame >= unit.state.currentFrameList.length
    ) {
        setFrameList(unit);
        unit.state.currentFrame = 0;
    }
    frameList = unit.state.currentFrameList;
    const spriteSheetPosition = frameList[unit.state.currentFrame];
    unit.position.spriteSheetPositionX =
        spriteSheetPosition.col * -unit.spriteInfo.spriteSize.x;
    unit.position.spriteSheetPositionY =
        spriteSheetPosition.row * -unit.spriteInfo.spriteSize.y;
    unit.state.currentFrame++;
};

function getAnimationSpeed(unit: ISprite): number {
    let stateSpecificAnimationSpeed;
    switch (unit.state.currentState) {
        case UNIT_STATES.MOVE:
            stateSpecificAnimationSpeed = unit.spriteInfo.movementAnimationSpeed;
            break;
        case UNIT_STATES.ATTACK:
            stateSpecificAnimationSpeed = unit.spriteInfo.attackAnimationSpeed;
            break;
        default:
            break;
    }
    return stateSpecificAnimationSpeed || unit.spriteInfo.animationSpeed;
}

function setFrameList(unit: ISprite) {
    switch (unit.state.currentState) {
        case UNIT_STATES.IDLE:
            unit.state.currentFrameList = SPRITESHEET_MAP[unit.spriteInfo.unitType].idleFrames;
            break;
        case UNIT_STATES.MOVE:
            unit.state.currentFrameList = SPRITESHEET_MAP[unit.spriteInfo.unitType].moveFrames;
            break;
        case UNIT_STATES.ATTACK:
            if (unit.state.currentFrame === 0) {
                unit.state.currentFrameList = SPRITESHEET_MAP[unit.spriteInfo.unitType].attackFrames;
            } else {
                // on attack completion, we don't loop it but instead go back to the idle state
                // (the attack is complete after one animation)                
                changeUnitState(unit, UNIT_STATES.IDLE);
                unit.state.currentFrameList = SPRITESHEET_MAP[unit.spriteInfo.unitType].idleFrames;
            }
            break;
        default:
            break;
    }
}

export const handleProjectiles = (
    projectiles: IProjectile[],
    grid: IExpeditionCell[][],
    playerUnits: ISprite[],
    enemyUnits: ISprite[]
): void => {
    for (let a = projectiles.length - 1; a >= 0; a--) {
        // check if collision.
        const projectile = projectiles[a];
        if (projectile.homing) {
            const targetX = get(projectile.target.position.positionXTweened) as number;
            const targetY = get(projectile.target.position.positionYTweened) as number;
            projectile.positionSpring.set({ x: targetX, y: targetY });
            const positionSpring: any = get(projectile.positionSpring);
            //console.log(targetX +  " " + targetY + " " + $positionSpring.x)
            // console.log(targetX + " " + targetY + " " + $positionSpring.x + " " + $positionSpring.y);
            const xDifference = Math.abs(positionSpring.x - targetX);
            const yDifference = Math.abs(positionSpring.y - targetY);
            if (xDifference < 25 && yDifference < 25) {
                processDamageCalculation(
                    projectile.damage,
                    projectile.target,
                    grid,
                    playerUnits,
                    enemyUnits
                );
                projectiles.splice(a, 1);
            }
        } else {
            const tweenedTargetX =
                projectile.target.position.coordinates.col * CELL_WIDTH;
            const tweenedTargetY =
                projectile.target.position.coordinates.row * CELL_HEIGHT;
            const invalidTarget =
                tweenedTargetX === undefined ||
                tweenedTargetY === undefined;
            const projectileReachedTarget =
                get(projectile.positionXTweened) === tweenedTargetX &&
                get(projectile.positionYTweened) === tweenedTargetY;
            if (invalidTarget || projectileReachedTarget) {
                processDamageCalculation(
                    projectile.damage,
                    projectile.target,
                    grid,
                    playerUnits,
                    enemyUnits
                );
                projectiles.splice(a, 1);
            }
        }
    }
}

function changeUnitState(unit: ISprite, newState: string) {
    if (unit.state.currentState === newState) return;
    unit.state.currentState = newState;
    // reset frame on state change to reset the animation
    unit.state.currentFrame = 0;
}