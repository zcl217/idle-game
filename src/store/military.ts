import { writable } from 'svelte/store';
import { STAGE_LIST } from '~/constants/military/stageList';
import { UNIT_TYPES } from '~/constants/military/units/unitTypes'
import type { ICoordinates } from '~/interfaces/common';
import type { ISprite } from '~/interfaces/military/sprite';
import type { IMilitaryUnit } from '~/interfaces/military/units';

export const unitToDeploy = writable({} as ISprite);
export const unitHasBeenDeployed = writable(false);
export const lifeCount = writable(1);
export const highlightMeleeCells = writable(false);
export const highlightRangedCells = writable(false);
export const highlightAttackRange = writable({} as ICoordinates);

let clearedStagesList: Record<string, boolean> = {};
for (let stage in STAGE_LIST) clearedStagesList[STAGE_LIST[stage]] = false;
export const clearedStages = writable(clearedStagesList);

const initialMilitaryUnitList = [
    { count: 2, type: UNIT_TYPES.SPEARMAN },
    { count: 2, type: UNIT_TYPES.FOOTPAD },
    { count: 2, type: UNIT_TYPES.HEAVY_INFANTRY },
    { count: 2, type: UNIT_TYPES.MAGE },
];

const createNewMilitaryUnitList = (militaryUnitList: IMilitaryUnit[]) => {
    const { subscribe, update, set } = writable(militaryUnitList);
    return {
        subscribe,
        incrementMilitaryUnitCount,
        updateMilitaryUnitCount,
        updateMilitaryUnitType,
        set
    };
    function incrementMilitaryUnitCount(type: string) {
        update((militaryUnitList) => {
            for (let unit of militaryUnitList) {
                if (unit.type === type) {
                    unit.count++;
                    break;
                }
            }
            return militaryUnitList;
        })
    }
    function updateMilitaryUnitCount(type: string, value: number) {
        update((militaryUnitList) => {
            for (let unit of militaryUnitList) {
                if (unit.type === type) {
                    unit.count = value
                    break;
                }
            }
            return militaryUnitList;
        })
    }
    function updateMilitaryUnitType(type: string, value: string) {
        update((militaryUnitList) => {
            for (let unit of militaryUnitList) {
                if (unit.type === type) {
                    unit.type = value
                    break;
                }
            }
            return militaryUnitList;
        })
    }
}
export const militaryUnitList = createNewMilitaryUnitList(initialMilitaryUnitList);

const createCount = () => {
    const { subscribe, set, update } = writable(0);
    return {
        subscribe,
        increment: () => update(n => n + 1),
        decrement: () => update(n => n - 1),
        reset: () => set(0),
        set
    };
}
export const removedEnemyUnitCount = createCount();