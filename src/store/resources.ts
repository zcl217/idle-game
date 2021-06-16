import { writable } from 'svelte/store';
import { RESOURCE_TYPES } from '~/constants/resources/resourceTypes';
import type { IResourceList } from '~/interfaces/resource';
import { INITIAL_RESOURCE_STATE } from '../constants/resources/resourceStates';

const initialExpeditionResourceRate = {} as Record<string, number>;
for (const r in RESOURCE_TYPES) initialExpeditionResourceRate[RESOURCE_TYPES[r]] = 0;

const createResourcesFromExpeditions = (expeditionResourceRate: Record<string, number>) => {
    const { subscribe, set, update } = writable(expeditionResourceRate);
    return {
        subscribe,
        increaseResourceRate: (type: string, amount: number) => {
            update((n: Record<string, number>) => {
                n[type] += amount
                return n;
            })
        },
        set
    };
}

const initialResourceSet = new Set([RESOURCE_TYPES.FOOD, RESOURCE_TYPES.WOOD, RESOURCE_TYPES.FARM]);
const createNewObtainedResources = (initialResourceSet: Set<string>) => {
    const { subscribe, update, set } = writable(initialResourceSet);
    return {
        subscribe,
        add,
        set
    };
    // if we add to the hashset directly (by accessing it with $),
    // reactivity isn't triggered.
    function add(payload: string) {
        update((obtainedResources) => {
            obtainedResources.add(payload);
            return obtainedResources;
        })
    }
}

const createNewResources = (resources: IResourceList) => {
    const { subscribe, update, set } = writable(resources);
    return {
        subscribe,
        setResourceValue,
        setResourceLimit,
        decrementResourceValue,
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
    function decrementResourceValue(type: string, value: number) {
        update((resources) => {
            let newValue = resources[type].value - value;
            resources[type].value = Math.max(newValue, 0);
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


export const blastFurnacesActivated = writable(false);
export const insufficientFood = writable(false);
export const ironSmeltersActivated = writable(false);
export const obtainedResources = createNewObtainedResources(initialResourceSet);
export const resources = createNewResources(INITIAL_RESOURCE_STATE);
export const resourcesFromExpeditions = createResourcesFromExpeditions(initialExpeditionResourceRate);
export const workshopsActivated = writable(false);