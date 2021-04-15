import { writable } from 'svelte/store';
import { initialResourceCostsState, initialResourceState } from '../constants/resourceStates';
import { resourceGeneratorMap } from '../constants/resourceTypes';

const createNewResources = (resources) => {
    const { subscribe, update } = writable(resources);

    return {
        subscribe,
        updateResourceValue,
        updateResourceLimit,
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
}

export const resources = createNewResources(initialResourceState);