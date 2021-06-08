import { writable } from 'svelte/store';
import { RESOURCE_TYPES } from '~/constants/resources/resourceTypes';

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

export const blastFurnacesActivated = writable(false);
export const curStoryProgress = writable(0);
export const inExpedition = writable(false);
export const insufficientFood = writable(false);
export const ironSmeltersActivated = writable(false);
export const obtainedResources = createNewObtainedResources(initialResourceSet);
export const playerImage = writable('../sprites/peasant.png');
export const playerName = writable('Peasant');
export const researchedSciences = writable(new Set<string>(['a', 'b', 'c', 'd']));
export const resourcesFromExpeditions = createResourcesFromExpeditions(initialExpeditionResourceRate);

/*
const createNewMessageLog = () => {
    const { subscribe, update } = writable('');

    return {
        subscribe,
        updateSceneMessage,
        addNewMessage,
    };

    function updateSceneMessage() {
        const curScene = getCurActScene();
        if (storyText[curScene]) {
            update((messageLog) => {
                messageLog.unshift(...storyText[curScene]);
                while (messageLog.length > 10) messageLog.pop();
                return messageLog;
            })
        }
    }

    function addNewMessage(newMessage) {
        update((messageLog) => {
            messageLog.unshift(newMessage);
            if (messageLog.length > 10) messageLog.pop();
            return messageLog;
        })
    }
}

export const messageLog = createNewMessageLog();
*/