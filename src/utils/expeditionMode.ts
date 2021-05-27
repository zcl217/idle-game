import { cloneDeep, uniqueId } from "lodash";
import { CELL_HEIGHT, CELL_WIDTH, MAP_1, UNIT_PATHS } from "~/constants/military/maps";
import { UNIT_STATES, SPRITE_TYPE } from "~/constants/military/sprites";
import { WOLF1, WOLF3 } from "~/constants/military/units/monsters";
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

export const initializeEnemies = (level: number, enemyUnits: ISprite[], grid: IExpeditionCell[][]) => {
    console.log(enemyUnits)
    switch (level) {
        case 1: {
            // we need a settimeout to add enemyUnits into the array
            // so they don't spawn right away.
            let enemy = cloneDeep(WOLF3);
            enemy.state.unitPath = UNIT_PATHS.MAP_1.PATH_1;
            let { row, col } = enemy.state.unitPath[0];
            let startingCell = grid[row][col];
            const delay = 1000;
            const remainingEnemies = 5;
            createMultipleEnemies(enemy, enemyUnits, startingCell, delay, remainingEnemies);
            break;
        }

    }
}

function createMultipleEnemies(
    enemy: ISprite, enemyUnits: ISprite[], startingCell: IExpeditionCell, delay: number, remainingEnemies: number) {
    if (remainingEnemies === 0) return;
    let newEnemy = cloneDeep(enemy);
    initializeUnitPosition(newEnemy, newEnemy.state.unitPath[0].row, newEnemy.state.unitPath[0].col);
    newEnemy.spriteInfo.unitId = uniqueId();
    enemyUnits.push(newEnemy);
    startingCell.enemyUnitList.push(newEnemy);
    setTimeout(() => {
        createMultipleEnemies(enemy, enemyUnits, startingCell, delay, remainingEnemies - 1);
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
    lifeCount.set(30);
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
    // enemies can't attack while moving
    if (unit.spriteInfo.spriteType === SPRITE_TYPE.ENEMY &&
        unit.state.currentState !== UNIT_STATES.ATTACK) return;
    let target = getAttackTarget(unit, grid);
    //  console.log(target);
    if (!target) {
        changeUnitState(unit, UNIT_STATES.IDLE);
        return;
    };
    changeUnitState(unit, UNIT_STATES.ATTACK);

    // if unit is already attacking then skip
    // (we check currentFrame against 1 and not 0 because handleUnitAnimations is run
    // after damage calculations and unit movements, which means that anything that changes
    // the unit state will animate the attack by one frame before we end up calculating
    // the actual damage)
    if (unit.state.currentFrame !== 1) return;
    if (unit.spriteInfo.melee) {
        processDamageCalculation(unit.spriteInfo.damage, target, grid, playerUnits, enemyUnits);
    } else {
        // fire a projectile. when the projectile hits the enemy, that's when we calculate dmg
        fireHomingProjectile(unit, target, grid, playerUnits, enemyUnits, projectiles);
        //  fireProjectile(unit, target, grid, playerUnits, enemyUnits, projectiles);
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
    let startingPositionX = unit.position.coordinates.col * CELL_WIDTH;
    let startingPositionY = unit.position.coordinates.row * CELL_HEIGHT;
    newProjectile.target = target;
    newProjectile.damage = unit.spriteInfo.damage;
    const projectileSpeed = calculateProjectileSpeed(
        newProjectile.speed,
        unit.position.coordinates,
        target.position.coordinates
    );
    newProjectile.positionXTweened = tweened(startingPositionX, {
        duration: projectileSpeed
    });
    newProjectile.positionYTweened = tweened(startingPositionY, {
        duration: projectileSpeed
    });
    let targetPositionX = target.position.coordinates.col * CELL_WIDTH;
    let targetPositionY = target.position.coordinates.row * CELL_HEIGHT;
    newProjectile.positionXTweened.set(targetPositionX);
    // TODO: use handleProjectiles instead so we can add more logic
    // FIX THIS PART SINCE WE'RE USING TWO DIFFERENT PROJECTILE SYSTEMS NOW
    // (the non homing version is more flexible in controlling the exact speed of it)
    newProjectile.positionYTweened.set(targetPositionY).then(() => {
        processDamageCalculation(newProjectile.damage, target, grid, playerUnits, enemyUnits);
        for (let a = 0; a < projectiles.length; a++) {
            if (projectiles[a].projectileId === newProjectile.projectileId) {
                projectiles.splice(a, 1);
                return;
            }
        }
    });
    projectiles.push(newProjectile);
}

function fireHomingProjectile(
    unit: ISprite,
    target: ISprite,
    grid: IExpeditionCell[][],
    playerUnits: ISprite[],
    enemyUnits: ISprite[],
    projectiles: IProjectile[]
) {
    let newProjectile = cloneDeep(UNIT_PROJECTILES[unit.spriteInfo.unitType]);
    newProjectile.projectileId = uniqueId();
    newProjectile.homing = true;
    // newProjectile.damage = unit.spriteInfo.damage;
    newProjectile.damage = 1;
    let startingPositionX = unit.position.coordinates.col * CELL_WIDTH;
    let startingPositionY = unit.position.coordinates.row * CELL_HEIGHT;
    newProjectile.target = target;
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
    if (target.spriteInfo.spriteType === SPRITE_TYPE.PLAYER) {
        targetCell.playerUnit = undefined;
        removeFromUnitList(target, playerUnits);
    } else if (target.spriteInfo.spriteType === SPRITE_TYPE.ENEMY) {
        removeFromUnitList(target, targetCell.enemyUnitList);
        removeFromUnitList(target, enemyUnits);
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
        coordinatesInRange = getAdjacentCoordinates(coordinates, grid);
    } else {
        coordinatesInRange = getCoordinateRange(
            coordinates,
            curUnit.spriteInfo.attackRange,
            grid
        );
    }
    if (curUnit.spriteInfo.spriteType === SPRITE_TYPE.PLAYER) {
        // return the first enemy unit found in the coordinates within attack range
        for (let coordinate of coordinatesInRange) {
            let currentCell = grid[coordinate.row][coordinate.col];
            if (currentCell.enemyUnitList.length > 0)
                return currentCell.enemyUnitList[0];
        }
    } else if (curUnit.spriteInfo.spriteType === SPRITE_TYPE.ENEMY) {
        for (let coordinate of coordinatesInRange) {
            let currentCell = grid[coordinate.row][coordinate.col];
            if (currentCell.playerUnit) return currentCell.playerUnit;
        }
    } else {
        return undefined;
    }
};

const getAdjacentCoordinates = (
    coordinates: ICoordinates,
    grid: IExpeditionCell[][]
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
    return pruneCoordinateList(coordinateList, grid, true);
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
    grid: IExpeditionCell[][]
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
    melee: boolean = false
): ICoordinates[] {
    let prunedList: ICoordinates[] = [];
    for (let coordinates of coordinateList) {
        if (
            coordinates.row < 0 ||
            coordinates.col < 0 ||
            coordinates.row >= grid.length ||
            coordinates.col >= grid[0].length
        ) continue;
        if (melee && !grid[coordinates.row][coordinates.col].isPath) continue;
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
    // TODO: if unit reaches end we need to decrease life count
    if (unit.state.currentPathIndex >= unit.state.unitPath.length - 1) {
        lifeCount.update((n: number) => n > 0 ? n - 1 : n);
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

export const handleProjectiles = (projectiles: IProjectile[]) => {
    // if projectile reach target, remove from array and deal damage and handle death
    for (let projectile of projectiles) {
        if (projectile.positionXTweened) continue;
    }
};

function changeUnitState(unit: ISprite, newState: string) {
    if (unit.state.currentState === newState) return;
    unit.state.currentState = newState;
    // reset frame on state change to reset the animation
    unit.state.currentFrame = 0;
}