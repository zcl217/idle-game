import { buttonTypes } from './buttons.js';

export const infoBoxes = {
    [buttonTypes.GATHER_FOOD]: {
        title: 'Gather Food',
        text: 'Collect 1 food'
    },
    [buttonTypes.CREATE_FARM]: {
        title: 'Create Farm',
        text: 'Generates 1 food per second'
    },
    [buttonTypes.GATHER_WOOD]: {
        title: 'Create Farm',
        text: 'Collect 1 wood'
    },
    [buttonTypes.BUILD_STORAGE]: {
        title: 'Build Storage',
        text: 'Increase food and wood limit by 100 per storage'
    }
}