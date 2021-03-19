import { buttonTypes } from './buttons.js';
import { resourceTypes } from './resourceTypes';

export const initialResourceState = {
    [resourceTypes.FOOD]: {
        value: 0,
        limit: 100,
        display: true
    },
    [resourceTypes.FARMS]: {
        value: 0,
        generationValue: 1,
        limit: Number.MAX_VALUE,
        display: false
    },
    [resourceTypes.WOOD]: {
        value: 0,
        limit: 100,
        display: false
    },
    [resourceTypes.STORAGE]: {
        value: 0,
        limit: 10,
        display: false
    },
    [resourceTypes.GOLD]: {
        value: 0,
        limit: 100,
        display: false
    }
}

export const initialResourceCostsState = {
    [resourceTypes.FARMS]: [
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
    [resourceTypes.STORAGE]: [
        {
            type: resourceTypes.WOOD,
            text: 'Wood',
            cost: 100,
        },
    ],
    // [buttonTypes.CREATE_FARM]: [
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