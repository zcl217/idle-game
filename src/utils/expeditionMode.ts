import { cloneDeep, uniqueId } from "lodash";
import { CELL_HEIGHT, CELL_WIDTH, MAP_1, UNIT_PATHS } from "~/constants/military/maps";
import { UNIT_STATES, SPRITE_TYPE } from "~/constants/military/sprites";
import { BAT, GHAST, GHOST, SHADOW, SKELETON, SKELETON_ARCHER, WOLF1, WOLF2, WOLF3 } from "~/constants/military/units/monsters";
import type { ICoordinates } from "~/interfaces/common";
import type { IExpeditionCell } from "~/interfaces/military/expeditionGrid";
import type { IMap } from "~/interfaces/military/map";
import type { ISprite } from "~/interfaces/military/sprite";
import { tweened, spring } from "svelte/motion";
import { get } from 'svelte/store';
import { SPRITESHEET_MAP } from "~/constants/military/spriteSheetMap";
import type { IProjectile } from "~/interfaces/military/projectile";
import { UNIT_PROJECTILES } from "~/constants/military/projectiles";
import { createEventDispatcher } from "svelte";
import { STAGE_LIST } from "~/constants/military/stageList";
import { ENEMY_SPAWN_LIST } from "~/constants/military/enemySpawnList";
import { removedEnemyUnitCount } from "~/store/military";

export const initializeGrid = (mapType: number) => {
    let grid: IExpeditionCell[][] = [];
    let cellCount = 0;
    let backgroundImage = `url("sprites/map${mapType}/tile`;
    for (let y = 0; y < 7; y++) {
        let row: IExpeditionCell[] = [];
        // siwtch statement for the map, check MAP_X constant
        for (let x = 0; x < 9; x++) {
            let cell: IExpeditionCell = {
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

const isStart = (row: number, col: number, mapType: number) => {
    switch (mapType) {
        case 1:
            for (let startCoordinates of MAP_1.start) {
                if (startCoordinates.row === row && startCoordinates.col === col)
                    return true;
            }
        default:
            return false;
    }
}

const isEnd = (row: number, col: number, mapType: number) => {
    switch (mapType) {
        case 1:
            for (let endCoordinates of MAP_1.end) {
                if (endCoordinates.row === row && endCoordinates.col === col)
                    return true;
            }
        default:
            return false;
    }
}

const getCellImagePath = (cellCount: number): string => {
    return ("00" + cellCount).slice(-3);
}

export const setGridPath = (grid: IExpeditionCell[][], mapType: number) => {
    let mapLayout: IMap = {} as IMap;
    switch (mapType) {
        case 1:
            mapLayout = MAP_1;
            break;
        case 2:
            break;
        case 3:
            break;
    }
    let { path } = mapLayout;
    console.log(grid);
    for (let p of path) {
        grid[p.row][p.col].isPath = true;
    }
};

export const initializeEnemies = (stage: string, enemyUnits: ISprite[], grid: IExpeditionCell[][]) => {
    console.log(enemyUnits);

    let totalEnemies = 0;
    for (let enemySpawnInfo of ENEMY_SPAWN_LIST[stage]) {
        totalEnemies += enemySpawnInfo.amount;
        setTimeout(() => {
            let enemy = cloneDeep(enemySpawnInfo.enemyUnit);
            enemy.state.unitPath = enemySpawnInfo.path;
            let { row, col } = enemy.state.unitPath[0];
            let startingCell = grid[row][col];
            createEnemies(enemy,
                enemyUnits,
                startingCell,
                enemySpawnInfo.intervalDelay,
                enemySpawnInfo.amount);
        }, enemySpawnInfo.spawnDelay);
    }

    return totalEnemies;
    switch (stage) {
        case STAGE_LIST["1-1"]:

            break;
        case '1': {
            let temp = [WOLF1, SKELETON_ARCHER];
            // let temp = [SKELETON, SKELETON_ARCHER, GHOST, SHADOW, BAT, GHAST]
            let a = 0;
            let handler = setInterval(() => {
                // we need a settimeout to add enemyUnits into the array
                // so they don't spawn right away.
                let enemy = cloneDeep(temp[a]);
                enemy.state.unitPath = UNIT_PATHS.MAP_1.PATH_1;
                let { row, col } = enemy.state.unitPath[0];
                let startingCell = grid[row][col];
                const delay = 1000;
                const remainingEnemies = 3;
                createEnemies(enemy, enemyUnits, startingCell, delay, remainingEnemies);

                a++;
                if (a >= temp.length) clearInterval(handler);
            }, 1000);
            break;
        }

    }
}

function createEnemies(
    enemy: ISprite, enemyUnits: ISprite[], startingCell: IExpeditionCell, delay: number, remainingEnemies: number) {
    if (remainingEnemies === 0) return;
    let newEnemy = cloneDeep(enemy);
    initializeUnitPosition(newEnemy, newEnemy.state.unitPath[0].row, newEnemy.state.unitPath[0].col);
    newEnemy.spriteInfo.unitId = uniqueId();
    enemyUnits.push(newEnemy);
    startingCell.enemyUnitList.push(newEnemy);
    setTimeout(() => {
        createEnemies(enemy, enemyUnits, startingCell, delay, remainingEnemies - 1);
    }, delay)
}

export function initializeUnitPosition(unit: ISprite, row: number, col: number) {
    let startingPositionX = col * CELL_WIDTH;
    let startingPositionY = row * CELL_HEIGHT;
    unit.position.positionXTweened = tweened(startingPositionX, {
        duration: unit.position.tweenedDelay || 1000
    });
    unit.position.positionYTweened = tweened(startingPositionY, {
        duration: unit.position.tweenedDelay || 1000
    })
    unit.position.coordinates = { row, col };
}

export const setLifeCount = (level: number, lifeCount: any) => {
    lifeCount.set(2);
}

export const handleDamageCalculations = (
    grid: IExpeditionCell[][],
    playerUnits: ISprite[],
    enemyUnits: ISprite[],
    projectiles: IProjectile[]
) => {
    for (let unit of playerUnits) processAttack(unit, grid, playerUnits, enemyUnits, projectiles);
    for (let unit of enemyUnits) processAttack(unit, grid, playerUnits, enemyUnits, projectiles);
};

function processAttack(
    unit: ISprite,
    grid: IExpeditionCell[][],
    playerUnits: ISprite[],
    enemyUnits: ISprite[],
    projectiles: IProjectile[]
) {
    // console.log(unit.state.currentState);
    let target = getAttackTarget(unit, grid);

    if (!target) {
        return;
    };
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
        // TODO: bug with projectiles: disappears before reaching the target
        // my guess: due to how the frame rendering works, if you place mage at wrong time
        // the dmg is processed before the fireball animation completes
        // (and projectiles are removed after dmg is processed)
        // although... I thought we're checking the px of the projectile to handle the
        // dmg calculation so I feel like that's not the true cause

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
) => {
    target.state.currentHp -= damage;
    // remove sprite from cell and master list
    if (target.state.currentHp <= 0) {
        const targetCoordinates = target.position.coordinates;
        let targetCell: IExpeditionCell =
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
) {
    let newProjectile = cloneDeep(UNIT_PROJECTILES[unit.spriteInfo.unitType]);
    newProjectile.projectileId = uniqueId();
    newProjectile.homing = false;
    newProjectile.target = target;
    newProjectile.damage = unit.spriteInfo.damage;
    const projectileSpeed = calculateProjectileSpeed(
        newProjectile.speed,
        unit.position.coordinates,
        target.position.coordinates
    );
    let startingPositionX = unit.position.coordinates.col * CELL_WIDTH;
    let startingPositionY = unit.position.coordinates.row * CELL_HEIGHT;
    newProjectile.positionXTweened = tweened(startingPositionX, {
        duration: projectileSpeed
    });
    newProjectile.positionYTweened = tweened(startingPositionY, {
        duration: projectileSpeed
    });
    let targetPositionX = target.position.coordinates.col * CELL_WIDTH;
    let targetPositionY = target.position.coordinates.row * CELL_HEIGHT;
    newProjectile.positionXTweened.set(targetPositionX);
    newProjectile.positionYTweened.set(targetPositionY);
    projectiles.push(newProjectile);
}

function fireHomingProjectile(
    unit: ISprite,
    target: ISprite,
    projectiles: IProjectile[]
) {
    let newProjectile = cloneDeep(UNIT_PROJECTILES[unit.spriteInfo.unitType]);
    newProjectile.projectileId = uniqueId();
    newProjectile.homing = true;
    newProjectile.damage = unit.spriteInfo.damage;
    newProjectile.target = target;
    let startingPositionX = unit.position.coordinates.col * CELL_WIDTH;
    let startingPositionY = unit.position.coordinates.row * CELL_HEIGHT;
    console.log(startingPositionX + " " + startingPositionY);
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
) {
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
) {
    if (target.spriteInfo.isEnemy) {
        removeFromUnitList(target, targetCell.enemyUnitList);
        removeFromUnitList(target, enemyUnits);
        removedEnemyUnitCount.increment();
    } else {
        targetCell.playerUnit = undefined;
        removeFromUnitList(target, playerUnits);
    }
}

function removeFromUnitList(target: ISprite, unitList: ISprite[]) {
    for (let a = 0; a < unitList.length; a++) {
        if (unitList[a].spriteInfo.unitId === target.spriteInfo.unitId) {
            unitList.splice(a, 1);
            return;
        }
    }
}

const getAttackTarget = (curUnit: ISprite, grid: IExpeditionCell[][]): ISprite | undefined => {
    let coordinates = curUnit.position.coordinates;
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
        for (let coordinate of coordinatesInRange) {
            let currentCell = grid[coordinate.row][coordinate.col];
            if (currentCell.playerUnit) return currentCell.playerUnit;
        }
    } else {
        // return the first enemy unit found in the coordinates within attack range
        for (let coordinate of coordinatesInRange) {
            let currentCell = grid[coordinate.row][coordinate.col];
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

const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];
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
    isMelee: boolean = false
): ICoordinates[] {
    let prunedList: ICoordinates[] = [];
    for (let coordinates of coordinateList) {
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

export const handleEnemyMovements = (enemyUnits: ISprite[], grid: IExpeditionCell[][], lifeCount: any) => {
    for (let unit of enemyUnits) {
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
    for (let unit of list) {
        if (unit.spriteInfo.unitId === target.spriteInfo.unitId) return true;
    }
    return false;
}

export const handleUnitAnimations = (playerUnits: ISprite[], enemyUnits: ISprite[], frame: number) => {
    for (let unit of playerUnits) animateUnit(unit, frame);
    for (let unit of enemyUnits) animateUnit(unit, frame);
};

const animateUnit = (unit: ISprite, frame: number) => {
    // animate units based on their animation speed
    // (if the animation speed is too slow then they won't end up animating, so
    // make sure the delays are properly set)


    /*
         might have to implement a separate animation timer for attack...
         (heavy infantry attack has too many frames)
         to do this, we first have to get the type of unit state they're in,
         and then use the appropriate animationspeed thing
         (use optional property to skip unnecessary processing. maybe at most half
         of the units will have a separate animation timer)
    */
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
    // console.log(spriteSheetPosition)
    unit.position.spriteSheetPositionX =
        spriteSheetPosition.col * -unit.spriteInfo.spriteSize.x;
    unit.position.spriteSheetPositionY =
        spriteSheetPosition.row * -unit.spriteInfo.spriteSize.y;
    /// console.log(sprite.spriteSheetPositionX + " " + sprite.spriteSheetPositionY);
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
) => {
    for (let a = projectiles.length - 1; a >= 0; a--) {
        // check if collision.
        let projectile = projectiles[a];
        if (projectile.homing) {
            let targetX = get(projectile.target.position.positionXTweened) as number;
            let targetY = get(projectile.target.position.positionYTweened) as number;
            projectile.positionSpring.set({ x: targetX, y: targetY });
            const positionSpring: any = get(projectile.positionSpring);
            //console.log(targetX +  " " + targetY + " " + $positionSpring.x)
            // console.log(targetX + " " + targetY + " " + $positionSpring.x + " " + $positionSpring.y);
            let xDifference = Math.abs(positionSpring.x - targetX);
            let yDifference = Math.abs(positionSpring.y - targetY);
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
            let tweenedTargetX =
                projectile.target.position.coordinates.col * CELL_WIDTH;
            let tweenedTargetY =
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