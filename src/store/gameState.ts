import { writable } from 'svelte/store';
import { EMPIRE_BUTTON_TYPES } from '~/constants/buttons/empireButtons';

export const curStoryProgress = writable(0);
export const hiddenButtons = writable(new Set<string>([
    EMPIRE_BUTTON_TYPES.GATHER_FOOD,
    EMPIRE_BUTTON_TYPES.GATHER_WOOD,
    EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE
]));
export const inExpedition = writable(false);
export const playerImage = writable('../sprites/peasant.png');
export const playerName = writable('Peasant');
export const researchedSciences = writable(new Set<string>(['a', 'b', 'c', 'd']));

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