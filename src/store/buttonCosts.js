import { writable } from 'svelte/store';
import { initialEmpireButtonCosts } from '~/constants/buttons/empireButtons';

const createNewEmpireButtonCosts = (empireButtonCosts) => {
    const { subscribe, update } = writable(empireButtonCosts);

    return {
        subscribe,
        updateButtonCosts,
    };

    function updateButtonCosts(type, multiplier) {
        update((empireButtonCosts) => {
            const resources = empireButtonCosts[type]
            resources.map(resource => {
                resource.cost = Math.round(multiplier(resource.cost))
            })
            return empireButtonCosts;
        })
    }
}


export const empireButtonCosts = createNewEmpireButtonCosts(initialEmpireButtonCosts);
