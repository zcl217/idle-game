import { cloneDeep, uniqueId } from "lodash";
import { MAP_1, UNIT_PATHS } from "~/constants/military/maps";
import { unitStates, spriteType } from "~/constants/military/sprites";
import { wolf1 } from "~/constants/military/units/monsters";
import type { ICoordinates } from "~/interfaces/common";
import type { IExpeditionCell } from "~/interfaces/military/expeditionGrid";
import type { IMap } from "~/interfaces/military/map";
import type { ISprite } from "~/interfaces/military/sprite";
import { tweened } from "svelte/motion";
import { spriteSheetMap } from "~/constants/military/spriteSheetMap";

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
            let enemy = cloneDeep(wolf1);
            enemy.spriteInfo.unitId = uniqueId();
            enemy.state.unitPath = UNIT_PATHS.MAP_1.PATH_1;
            initializeUnitPosition(enemy, enemy.state.unitPath[0].row, enemy.state.unitPath[0].col);
            let { row, col } = enemy.state.unitPath[0];
            let startingCell = grid[row][col];
            createMultipleEnemies(enemy, enemyUnits, startingCell, 1000, 1);
            break;
        }
    }
}

function createMultipleEnemies(
    enemy: ISprite, enemyUnits: ISprite[], startingCell: IExpeditionCell, delay: number, remainingEnemies: number) {
    if (remainingEnemies === 0) return;
    let newEnemy = cloneDeep(enemy);
    enemyUnits.push(newEnemy);
    startingCell.enemyUnitList.push(newEnemy);
    setTimeout(() => {
        createMultipleEnemies(enemy, enemyUnits, startingCell, delay, remainingEnemies - 1);
    }, delay)
}

export function initializeUnitPosition(unit: ISprite, row: number, col: number) {
    let startingPositionX = col * 72 + unit.offset;
    let startingPositionY = row * 72;
    unit.position.positionXTweened = tweened(startingPositionX, {
        duration: unit.spriteInfo.movementDelay || 1000
    });
    unit.position.positionYTweened = tweened(startingPositionY, {
        duration: unit.spriteInfo.movementDelay || 1000
    })
    unit.position.coordinates = { row, col };
}

export const getLifeCount = (level: number) => {
    return 0;
}

export const handleDamageCalculations = (
    grid: IExpeditionCell[][],
    playerUnits: ISprite[],
    enemyUnits: ISprite[]
) => {
    for (let unit of playerUnits) processAttack(unit, grid, playerUnits, enemyUnits);
    for (let unit of enemyUnits) processAttack(unit, grid, playerUnits, enemyUnits);
};

function processAttack(
    unit: ISprite,
    grid: IExpeditionCell[][],
    playerUnits: ISprite[],
    enemyUnits: ISprite[]
) {
    console.log(unit.state.currentState);
    // enemies can't attack while moving, but player units can't move so
    // we don't have to check for that
    if (unit.spriteInfo.spriteType === spriteType.ENEMY &&
        unit.state.currentState !== unitStates.ATTACK) return;
    changeUnitState(unit, unitStates.ATTACK);
    console.log(unit.state.currentFrame);
    // if unit is already attacking then skip
    // (we check currentFrame against 1 and not 0 because handleUnitAnimations is run
    // after damage calculations and unit movements, which means that anything that changes
    // the unit state will animate the attack by one frame before we end up calculating
    // the actual damage)
    if (unit.state.currentFrame !== 1) return;
    let target = getAttackTarget(unit, grid);
    console.log('target: ' + target);
    if (!target) {
        changeUnitState(unit, unitStates.IDLE);
        return;
    };
    if (unit.spriteInfo.melee) {
        target.state.currentHp -= unit.spriteInfo.damage;
        const targetCoordinates = target.position.coordinates;
        let targetCell: IExpeditionCell =
            grid[targetCoordinates.row][targetCoordinates.col];
        // remove sprite from cell and master list
        if (target.state.currentHp <= 0) processUnitDeath(target, targetCell, playerUnits, enemyUnits);
    } else {
        // fire a projectile. when the projectile hits the enemy, that's when we calculate dmg
    }
}

function processUnitDeath(
    target: ISprite,
    targetCell: IExpeditionCell,
    playerUnits: ISprite[],
    enemyUnits: ISprite[]
) {
    if (target.spriteInfo.spriteType === spriteType.PLAYER) {
        targetCell.playerUnit = undefined;
        removeFromUnitList(target, playerUnits);
    } else if (target.spriteInfo.spriteType === spriteType.ENEMY) {
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
    console.log(coordinatesInRange);
    if (curUnit.spriteInfo.spriteType === spriteType.PLAYER) {
        // return the first enemy unit found in the coordinates within attack range
        for (let coordinate of coordinatesInRange) {
            let currentCell = grid[coordinate.row][coordinate.col];
            if (currentCell.enemyUnitList.length > 0)
                return currentCell.enemyUnitList[0];
        }
    } else if (curUnit.spriteInfo.spriteType === spriteType.ENEMY) {
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
    for (let range = 1; range <= radius; range++) {
        for (let direction of directions) {
            coordinateList.push({
                row: row + direction[0] * range,
                col: col + direction[1] * range,
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

// this path index variable... how is it managed?
// we only have two choices:
// 1: map it as a property to object (don't want to do this)
// 2: make another data structure where we map each sprite to it's unitPath index
// so we know how far it travelled
export const handleEnemyMovements = (enemyUnits: ISprite[], grid: IExpeditionCell[][]) => {
    for (let unit of enemyUnits) {
        const unitPath: ICoordinates[] = unit.state.unitPath;
        if (
            // remove -1 if we're doing currentPathIndex++ instead of prefix
            unit.state.currentPathIndex >= unitPath.length - 1 ||
            unit.state.currentState !== unitStates.IDLE
        ) continue;
        changeUnitState(unit, unitStates.MOVE);
        const previousCol = unitPath[unit.state.currentPathIndex].col;
        const { row, col } = unitPath[unit.state.currentPathIndex + 1];
        unit.position.facingRight = col >= previousCol;
        // attack the blocking player unit
        if (grid[row][col].playerUnit) {
            changeUnitState(unit, unitStates.ATTACK);
        } else {
            grid[row][col].enemyUnitArriving = true;
            unit.position.positionXTweened.set(col * 72 + unit.offset);
            unit.position.positionYTweened.set(row * 72).then(() => {
                handleCompletedMovement(unit, grid);
                grid[row][col].enemyUnitArriving = false;
                unit.position.coordinates = { row, col };
            });
            unit.state.currentPathIndex++
        }
    }
};

function handleCompletedMovement(unit: ISprite, grid: IExpeditionCell[][]) {
    // transfer the unit from the previous cell (where it came from) to the current cell
    const previousCellCoordinates = unit.state.unitPath[unit.state.currentPathIndex - 1];
    const previousCell = grid[previousCellCoordinates.row][previousCellCoordinates.col];
    // if the unit doesn't exist in the previous list, then it has died
    if (!unitExistsInList(unit, previousCell.enemyUnitList)) return;
    removeFromUnitList(unit, previousCell.enemyUnitList);

    // TODO: if unit reaches end we need to decrease life count
    if (unit.state.currentPathIndex >= unit.state.unitPath.length) return;
    const currentCellCoordinates = unit.state.unitPath[unit.state.currentPathIndex];
    const currentCell = grid[currentCellCoordinates.row][currentCellCoordinates.col];
    currentCell.enemyUnitList.push(unit);
    changeUnitState(unit, unitStates.IDLE);
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
    if (frame % unit.spriteInfo.animationSpeed !== 0) return;
    let frameList: ICoordinates[] = [];
    if (unit.state.currentFrame === 0 ||
        unit.state.currentFrame >= unit.state.currentFrameList.length
    ) {
        switch (unit.state.currentState) {
            case unitStates.IDLE:
                unit.state.currentFrameList = spriteSheetMap[unit.spriteInfo.unitType].idleFrames;
                break;
            case unitStates.MOVE:
                unit.state.currentFrameList = spriteSheetMap[unit.spriteInfo.unitType].moveFrames;
                break;
            case unitStates.ATTACK:
                if (unit.state.currentFrame === 0) {
                    unit.state.currentFrameList = spriteSheetMap[unit.spriteInfo.unitType].attackFrames;
                } else {
                    // on attack completion, we don't loop it but instead go back to the idle state
                    // (the attack is complete after one animation)                  
                    changeUnitState(unit, unitStates.IDLE);
                }
                break;
            default:
                break;
        }
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

export const handleProjectileAnimations = () => { };

function changeUnitState(unit: ISprite, newState: string) {
    if (unit.state.currentState === newState) return;
    unit.state.currentState = newState;
    // reset frame on state change to reset the animation
    unit.state.currentFrame = 0;
}