import { writable } from 'svelte/store';
import { STAGE_LIST } from '~/constants/military/stageList';
import { UNIT_TYPES } from '~/constants/military/units/unitTypes'
import type { ICoordinates } from '~/interfaces/common';
import type { ISprite } from '~/interfaces/military/sprite';

const clearedStagesList: Record<string, boolean> = {};
for (const stage in STAGE_LIST) clearedStagesList[STAGE_LIST[stage]] = false;

const initialMilitaryUnitList: Record<string, { count: number, type: string }> = {
    [UNIT_TYPES.SPEARMAN]: { count: 1, type: UNIT_TYPES.SPEARMAN },
    [UNIT_TYPES.FOOTPAD]: { count: 0, type: UNIT_TYPES.FOOTPAD },
    [UNIT_TYPES.HEAVY_INFANTRY]: { count: 0, type: UNIT_TYPES.HEAVY_INFANTRY },
    [UNIT_TYPES.MAGE]: { count: 0, type: UNIT_TYPES.MAGE },
    [UNIT_TYPES.THUNDERER]: { count: 0, type: UNIT_TYPES.THUNDERER },
};
const createNewMilitaryUnitList = (militaryUnitList: Record<string, { count: number, type: string }>) => {
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
            militaryUnitList[type].count++;
            return militaryUnitList;
        })
    }
    function updateMilitaryUnitCount(type: string, value: number) {
        update((militaryUnitList) => {
            militaryUnitList[type].count = value;
            return militaryUnitList;
        })
    }
    function updateMilitaryUnitType(unitLineType: string, newType: string) {
        update((militaryUnitList) => {
            militaryUnitList[unitLineType].type = newType;
            return militaryUnitList;
        })
    }
}
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
const createNewSelectedMilitaryUnits = (initialList: string[]) => {
    const { subscribe, update, set } = writable(initialList);
    return {
        subscribe,
        addUnit,
        removeUnit,
        set
    };
    function addUnit(type: string) {
        update((selectedMilitaryUnits) => {
            selectedMilitaryUnits.push(type);
            return selectedMilitaryUnits;
        })
    }
    function removeUnit(type: string) {
        update((selectedMilitaryUnits) => {
            const index = selectedMilitaryUnits.findIndex(
                (unitType) => unitType === type
            );
            if (index >= 0) selectedMilitaryUnits.splice(index, 1);
            return selectedMilitaryUnits;
        })
    }
}
export const attackRangeCenterCoordinates = writable({} as ICoordinates);
export const clearedStages = writable(clearedStagesList);
export const isGlobalPoisonOn = writable(false);
export const lifeCount = writable(1);
export const militaryUnitList = createNewMilitaryUnitList(initialMilitaryUnitList);
export const removedEnemyUnitCount = createCount();
export const selectedMilitaryUnits = createNewSelectedMilitaryUnits([UNIT_TYPES.SPEARMAN]);
export const shouldHighlightMeleeCells = writable(false);
export const shouldHighlightRangedCells = writable(false);
export const unitHasBeenDeployed = writable(false);
export const unitToDeploy = writable({} as ISprite);