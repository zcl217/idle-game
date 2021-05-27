
import { uniqueId } from 'lodash'
import { RESOURCE_TYPES } from '../resourceTypes';
import type { IButtonCostList } from '~/interfaces/buttons';
import type { IPrereqsList } from '~/interfaces/common';

export const EMPIRE_BUTTON_TYPES = {
    GATHER_FOOD: uniqueId(),
    CREATE_FARM: uniqueId(),
    GATHER_WOOD: uniqueId(),
    BUILD_STORAGE: uniqueId(),
    CREATE_TREE_FARM: uniqueId(),
    BUILD_ATTRACTIVE_HOUSE: uniqueId(),
    BUILD_HOUSE: uniqueId(),
}

export const EMPIRE_BUTTON_TEXTS = {
    [EMPIRE_BUTTON_TYPES.GATHER_FOOD]: 'Gather Food',
    [EMPIRE_BUTTON_TYPES.CREATE_FARM]: 'Create Farm',
    [EMPIRE_BUTTON_TYPES.GATHER_WOOD]: 'Gather Wood',
    [EMPIRE_BUTTON_TYPES.BUILD_STORAGE]: 'Build Storage',
    [EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM]: 'Create Tree Farm',
    [EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE]: 'Attractive House',
    [EMPIRE_BUTTON_TYPES.BUILD_HOUSE]: 'Build House',
}

export const EMPIRE_BUTTON_PREREQS: IPrereqsList = {
    [EMPIRE_BUTTON_TYPES.GATHER_FOOD]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [EMPIRE_BUTTON_TYPES.CREATE_FARM]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [EMPIRE_BUTTON_TYPES.GATHER_WOOD]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.FARMS]
    },
    [EMPIRE_BUTTON_TYPES.BUILD_STORAGE]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.TREE_FARM]
    },
    [EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.STORAGE]
    },
    [EMPIRE_BUTTON_TYPES.BUILD_HOUSE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
}


export const INITIAL_EMPIRE_BUTTON_COSTS: IButtonCostList = {
    [EMPIRE_BUTTON_TYPES.CREATE_FARM]: [
        {
            type: RESOURCE_TYPES.FOOD,
            text: 'Food',
            cost: 20,
        },
        {
            type: RESOURCE_TYPES.WOOD,
            text: 'Wood',
            cost: 10,
        },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_STORAGE]: [
        {
            type: RESOURCE_TYPES.WOOD,
            text: 'Wood',
            cost: 100,
        },
    ],
    [EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM]: [
        {
            type: RESOURCE_TYPES.WOOD,
            text: 'Wood',
            cost: 50,
        },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE]: [
        {
            type: RESOURCE_TYPES.FOOD,
            text: 'Food',
            cost: 1,
        },
        {
            type: RESOURCE_TYPES.WOOD,
            text: 'Wood',
            cost: 0,
        },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_HOUSE]: [
        {
            type: RESOURCE_TYPES.HOMES,
            text: 'Wood',
            cost: 0,
        },
    ],
    // [EMPIRE_BUTTON_TYPES.CREATE_FARM]: [
    //     {
    //         type: [RESOURCE_TYPES.FOOD],
    //         text: 'Food',
    //         cost: 10,
    //     },
    //     {
    //         text:
    //     }
    // ],

}

export const EMPIRE_COST_MULTIPLIERS = {
    [EMPIRE_BUTTON_TYPES.CREATE_FARM]: (val: number) => {
        return val * 1.3 + 5
    },
    [EMPIRE_BUTTON_TYPES.BUILD_STORAGE]: (val: number) => {
        return val * 1.2 + 20
    },
    [EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM]: (val: number) => {
        return val * 1.5
    },
    [EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE]: (val: number) => {
        return Math.min(val * 1.3 + 33, 1000);
    },
    [EMPIRE_BUTTON_TYPES.BUILD_HOUSE]: (val: number) => {
        return val * 1.8 + 50
    },
}