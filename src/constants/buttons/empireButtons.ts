
import { uniqueId } from 'lodash'
import { resourceTypes } from '../resourceTypes';
import type { IButtonCostList } from '~/interfaces/buttons';
import type { IPrereqsList } from '~/interfaces/common';

export const empireButtonTypes = {
    GATHER_FOOD: uniqueId(),
    CREATE_FARM: uniqueId(),
    GATHER_WOOD: uniqueId(),
    BUILD_STORAGE: uniqueId(),
    CREATE_TREE_FARM: uniqueId(),
    BUILD_ATTRACTIVE_HOUSE: uniqueId(),
    BUILD_HOUSE: uniqueId(),
}

export const empireButtonTexts = {
    [empireButtonTypes.GATHER_FOOD]: 'Gather Food',
    [empireButtonTypes.CREATE_FARM]: 'Create Farm',
    [empireButtonTypes.GATHER_WOOD]: 'Gather Wood',
    [empireButtonTypes.BUILD_STORAGE]: 'Build Storage',
    [empireButtonTypes.CREATE_TREE_FARM]: 'Create Tree Farm',
    [empireButtonTypes.BUILD_ATTRACTIVE_HOUSE]: 'Attractive House',
    [empireButtonTypes.BUILD_HOUSE]: 'Build House',
}

export const empireButtonPrereqs: IPrereqsList = {
    [empireButtonTypes.GATHER_FOOD]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [empireButtonTypes.CREATE_FARM]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [empireButtonTypes.GATHER_WOOD]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [empireButtonTypes.CREATE_TREE_FARM]: {
        sciencePrereqs: [],
        resourcePrereqs: [resourceTypes.FARMS]
    },
    [empireButtonTypes.BUILD_STORAGE]: {
        sciencePrereqs: [],
        resourcePrereqs: [resourceTypes.TREE_FARM]
    },
    [empireButtonTypes.BUILD_ATTRACTIVE_HOUSE]: {
        sciencePrereqs: [],
        resourcePrereqs: [resourceTypes.STORAGE]
    },
    [empireButtonTypes.BUILD_HOUSE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
}


export const initialEmpireButtonCosts: IButtonCostList = {
    [empireButtonTypes.CREATE_FARM]: [
        {
            type: resourceTypes.FOOD,
            text: 'Food',
            cost: 20,
        },
        {
            type: resourceTypes.WOOD,
            text: 'Wood',
            cost: 10,
        },
    ],
    [empireButtonTypes.BUILD_STORAGE]: [
        {
            type: resourceTypes.WOOD,
            text: 'Wood',
            cost: 100,
        },
    ],
    [empireButtonTypes.CREATE_TREE_FARM]: [
        {
            type: resourceTypes.WOOD,
            text: 'Wood',
            cost: 50,
        },
    ],
    [empireButtonTypes.BUILD_ATTRACTIVE_HOUSE]: [
        {
            type: resourceTypes.FOOD,
            text: 'Food',
            cost: 1,
        },
        {
            type: resourceTypes.WOOD,
            text: 'Wood',
            cost: 0,
        },
    ],
    [empireButtonTypes.BUILD_HOUSE]: [
        {
            type: resourceTypes.HOMES,
            text: 'Wood',
            cost: 0,
        },
    ],
    // [empireButtonTypes.CREATE_FARM]: [
    //     {
    //         type: [resourceTypes.FOOD],
    //         text: 'Food',
    //         cost: 10,
    //     },
    //     {
    //         text:
    //     }
    // ],

}

export const empireCostMultipliers = {
    [empireButtonTypes.CREATE_FARM]: (val: number) => {
        return val * 1.3 + 5
    },
    [empireButtonTypes.BUILD_STORAGE]: (val: number) => {
        return val * 1.2 + 20
    },
    [empireButtonTypes.CREATE_TREE_FARM]: (val: number) => {
        return val * 1.5
    },
    [empireButtonTypes.BUILD_ATTRACTIVE_HOUSE]: (val: number) => {
        return Math.min(val * 1.3 + 33, 1000);
    },
    [empireButtonTypes.BUILD_HOUSE]: (val: number) => {
        return val * 1.8 + 50
    },
}