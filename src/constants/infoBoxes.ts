import { OTHER_BUTTON_TYPES } from './buttons/otherButtons';
import { EMPIRE_BUTTON_TYPES } from './buttons/empireButtons'
import type { IInfoBoxList } from "~/interfaces/infoBox"
import { MILITARY_BUTTON_TYPES } from './buttons/militaryButtons';

export const EMPIRE_INFO_BOXES: IInfoBoxList = {
    [EMPIRE_BUTTON_TYPES.GATHER_FOOD]: {
        title: 'Gather Food',
        text: 'Collect 1 food'
    },
    [EMPIRE_BUTTON_TYPES.CREATE_FARM]: {
        title: 'Create Farm',
        text: 'Generates 1 food per second'
    },
    [EMPIRE_BUTTON_TYPES.GATHER_WOOD]: {
        title: 'Create Farm',
        text: 'Collect 1 wood'
    },
    [EMPIRE_BUTTON_TYPES.BUILD_STORAGE]: {
        title: 'Build Storage',
        text: 'Increase food and wood limit by 100 per storage'
    },
    [EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM]: {
        title: 'Create Tree Farm',
        text: 'Generates 2 wood per second'
    },
    [EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE]: {
        title: 'Build Attractive House',
        text: 'Build a very attractive house capable of captivating the gaze and admiration of passersby'
    },
    [EMPIRE_BUTTON_TYPES.BUILD_HOUSE]: {
        title: 'Build House',
        text: 'Increases max workers by 1'
    },
    [EMPIRE_BUTTON_TYPES.BUILD_LIBRARY]: {
        title: 'Build Library',
        text: 'Unlocks science. Each library increases knowledge acquisition rate by 5%'
    },
}

export const SCIENCE_INFO_BOXES: IInfoBoxList = {

}

export const MILITARY_INFO_BOXES: IInfoBoxList = {
    [MILITARY_BUTTON_TYPES.TRAIN_HEAVY_INFANTRY]: {
        title: 'Train Heavy Infantry',
        text: 'Increases heavy infantry count by one'
    },
    [MILITARY_BUTTON_TYPES.UPGRADE_HEAVY_INFANTRY]: {
        title: 'Upgrade Heavy Infantry',
        text: 'Upgrades all heavy infantries'
    }
}

export const OTHER_INFO_BOXES: IInfoBoxList = {
    [OTHER_BUTTON_TYPES.LORD_1]: {
        title: 'The Final Bastion of Humanity',
        text: 'Become the lord of hope. You will lead humanity to heights never seen before, your name remembered for centuries to come. Your subjects will be filled with the wisest of scholars and the most legendary of knights.'
    },
    [OTHER_BUTTON_TYPES.LORD_2]: {
        title: 'Destroyer of All',
        text: `Don't worry, you're not actually going to destroy everything. However, your power will become so great that one could mistake you as a bringer of apocalypse. Be warned, however, as humans aren't capable of such power, nor will humans want to follow you...`
    },
}