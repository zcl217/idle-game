import { writable } from 'svelte/store';
import { INITIAL_EMPIRE_BUTTON_COSTS } from '~/constants/buttons/empireButtons';
import type { IButtonCostList } from '~/interfaces/buttons';

const createNewEmpireButtonCosts = (empireButtonCosts: IButtonCostList) => {
    const { subscribe, update, set } = writable(empireButtonCosts);

    return {
        subscribe,
        updateButtonCosts,
        set
    };

    function updateButtonCosts(type: string, multiplier: Function) {
        update((empireButtonCosts) => {
            const resources = empireButtonCosts[type]
            resources.map(resource => {
                resource.cost = Math.round(multiplier(resource.cost))
            })
            return empireButtonCosts;
        })
    }
}


export const empireButtonCosts = createNewEmpireButtonCosts(INITIAL_EMPIRE_BUTTON_COSTS);
