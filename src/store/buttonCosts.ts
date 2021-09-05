import { cloneDeep } from 'lodash';
import { writable } from 'svelte/store';
import { INITIAL_EMPIRE_BUTTON_COSTS } from '~/constants/buttons/empireButtons';
import type { IButtonCostList } from '~/interfaces/buttons';
import { buildingCostCalculator } from '~/utils/resourceHelpers';

const createNewEmpireButtonCosts = (empireButtonCosts: IButtonCostList) => {
    const { subscribe, update, set } = writable(cloneDeep(empireButtonCosts));
    return {
        subscribe,
        updateButtonCosts,
        set
    };
    function updateButtonCosts(type: string, buildingCount: number) {
        update((empireButtonCosts) => {
            const resources = empireButtonCosts[type]
            resources.map(resource => {
                resource.cost = Math.round(buildingCostCalculator(type, buildingCount, resource.type));
            })
            return empireButtonCosts;
        })
    }
}

export const empireButtonCosts = createNewEmpireButtonCosts(INITIAL_EMPIRE_BUTTON_COSTS);
