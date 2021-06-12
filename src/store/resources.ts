import { writable } from 'svelte/store';
import type { IResourceList } from '~/interfaces/resource';
import { INITIAL_RESOURCE_STATE } from '../constants/resources/resourceStates';

const createNewResources = (resources: IResourceList) => {
    const { subscribe, update, set } = writable(resources);
    return {
        subscribe,
        setResourceValue,
        setResourceLimit,
        incrementResourceValue,
        incrementResourceLimit,
        set
    };
    function setResourceValue(type: string, value: number) {
        // don't update the resource past its limit
        update((resources) => {
            let newValue = Math.min(value, resources[type].limit)
            // don't go below 0
            newValue = Math.max(newValue, 0);
            resources[type].value = newValue;
            return resources;
        })
    }
    function setResourceLimit(type: string, value: number) {
        update((resources) => {
            resources[type].limit = value;
            return resources;
        })
    }
    function incrementResourceValue(type: string, value: number) {
        update((resources) => {
            let newValue = resources[type].value + value;
            newValue = Math.min(newValue, resources[type].limit)
            resources[type].value = newValue;
            return resources;
        })
    }
    function incrementResourceLimit(type: string, value: number) {
        update((resources) => {
            resources[type].limit += value;
            return resources;
        })
    }
}

export const resources = createNewResources(INITIAL_RESOURCE_STATE);