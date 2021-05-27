import { OTHER_BUTTON_TYPES } from './buttons/buttons';
import { empireButtonTypes } from './buttons/empireButtons'
import type { IInfoBoxList } from "~/interfaces/infoBox"
import { militaryButtonTypes } from './buttons/militaryButtons';

export const empireInfoBoxes: IInfoBoxList = {
    [empireButtonTypes.GATHER_FOOD]: {
        title: 'Gather Food',
        text: 'Collect 1 food'
    },
    [empireButtonTypes.CREATE_FARM]: {
        title: 'Create Farm',
        text: 'Generates 1 food per second'
    },
    [empireButtonTypes.GATHER_WOOD]: {
        title: 'Create Farm',
        text: 'Collect 1 wood'
    },
    [empireButtonTypes.BUILD_STORAGE]: {
        title: 'Build Storage',
        text: 'Increase food and wood limit by 100 per storage'
    },
    [empireButtonTypes.CREATE_TREE_FARM]: {
        title: 'Create Tree Farm',
        text: 'Generates 2 wood per second'
    },
    [empireButtonTypes.BUILD_ATTRACTIVE_HOUSE]: {
        title: 'Build Attractive House',
        text: 'Build a very attractive house capable of captivating the gaze and admiration of passersby'
    },
    [empireButtonTypes.BUILD_HOUSE]: {
        title: 'Build House',
        text: 'Build a house. Increases max workers by 1'
    },
}

export const scienceInfoBoxes: IInfoBoxList = {

}

export const militaryInfoBoxes: IInfoBoxList = {
    [militaryButtonTypes.TRAIN_HEAVY_INFANTRY]: {
        title: 'Train Heavy Infantry',
        text: 'Increases heavy infantry count by one'
    },
    [militaryButtonTypes.UPGRADE_HEAVY_INFANTRY]: {
        title: 'Upgrade Heavy Infantry',
        text: 'Upgrades all heavy infantries'
    }
}

export const otherInfoBoxes: IInfoBoxList = {
    [OTHER_BUTTON_TYPES.LORD_1]: {
        title: 'The Final Bastion of Humanity',
        text: 'Become the lord of hope. You will lead humanity to heights never seen before, your name remembered for centuries to come. Your subjects will be filled with the wisest of scholars and the most legendary of knights.'
    },
    [OTHER_BUTTON_TYPES.LORD_2]: {
        title: 'Destroyer of All',
        text: `Don't worry, you're not actually going to destroy everything. However, your power will become so great that one could mistake you as a bringer of apocalypse. Be warned, however, as humans aren't capable of such power, nor will humans want to follow you...`
    },
}