import { writable } from 'svelte/store';
import { initialResourceCostsState, initialResourceState } from '../constants/resourceStates';
import { resourceGeneratorMap } from '../constants/resourceTypes';

export const createNewResources = (resources) => {
    const { subscribe, update } = writable(resources);

    return {
        subscribe,
        updateResourceValue,
        updateResourceLimit,
        toggleDisplay,
    };

    function updateResourceValue(type, value) {
        // don't update the resource past its limit
        update((resources) => {
            let newValue = Math.min(value, resources[type].limit)
            resources[type].value = newValue;
            return resources;
        })
    }
    
    function updateResourceLimit(type, value) {
        update((resources) => {
            resources[type].limit = value;
            return resources;
        })
    }

    function toggleDisplay(type) {
        update((resources) => {
            resources[type].display = true;
            return resources;
        })
    }
}

export const createNewResourceCosts = (resourceCosts) => {
    const { subscribe, update } = writable(resourceCosts);

    return {
        subscribe,
        updateResourceCosts,
    };

    function updateResourceCosts(type, multiplier) {
        update((resourceCosts) => {
            const resources = resourceCosts[type]
            resources.map(resource => {
                resource.cost = Math.round(multiplier(resource.cost))
            })
            return resourceCosts;
        })
    }
}

export const resources = createNewResources(initialResourceState);
export const resourceCosts = createNewResourceCosts(initialResourceCostsState);