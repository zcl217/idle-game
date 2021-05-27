import { writable } from 'svelte/store';
import { STAGE_LIST } from '~/constants/military/stageList';
import { unitType } from '~/constants/military/units/unitTypes'

export const unitToDeploy = new writable({});
export const lifeCount = new writable(0);
export const highlightMeleeCells = new writable(false);
export const highlightRangedCells = new writable(false);

let clearedStagesList = {};
for (let stage in STAGE_LIST) clearedStagesList[stage] = false;

export const clearedStages = new writable(clearedStagesList);

const initialMilitaryUnitList = [
    {
        count: 1,
        type: unitType.HEAVY_INFANTRY
    },
];

const createNewMilitaryUnitList = (militaryUnitList) => {
    const { subscribe, update } = writable(militaryUnitList);

    return {
        subscribe,
        updateMilitaryUnitCount,
        updateMilitaryUnitType
    };

    function updateMilitaryUnitCount(type, value) {
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

    function updateMilitaryUnitType(type, value) {
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