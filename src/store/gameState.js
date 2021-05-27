import { writable, get } from 'svelte/store';
import { RESOURCE_TYPES } from '~/constants/resourceTypes';


export const act = writable('1');
export const scene = writable('0');
export const playerImage = writable('../sprites/peasant.png');
export const playerName = writable('Peasant');
export const getCurActScene = () => {
    return `A${get(act)}S${get(scene)}`;
}
export const inExpedition = writable(false);
export const researchedSciences = writable(new Set());

const initialResourceSet = new Set(RESOURCE_TYPES.FOOD, RESOURCE_TYPES.WOOD, RESOURCE_TYPES.FARMS)

const createNewObtainedResources = (initialResourceSet) => {
    const { subscribe, update } = writable(new Set(initialResourceSet));

    return {
        subscribe,
        add
    };

    // if we add to the hashset directly (by accessing it with $),
    // reactivity isn't triggered.
    function add(payload) {
        update((obtainedResources) => {
            obtainedResources.add(payload);
            return obtainedResources;
        })
    }
}
export const obtainedResources = createNewObtainedResources(initialResourceSet);

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