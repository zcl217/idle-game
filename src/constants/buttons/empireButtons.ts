
import { uniqueId } from 'lodash'
import { RESOURCE_TYPES } from '../resources/resourceTypes';
import type { IButtonCostList } from '~/interfaces/buttons';
import type { IPrereqsList } from '~/interfaces/common';
import { STORY_PROGRESS_LIST } from '~/constants/story';
import { SCIENCE_BUTTON_TYPES } from './scienceButtons';

export const EMPIRE_BUTTON_TYPES = {
    GATHER_FOOD: uniqueId(),
    CREATE_FARM: uniqueId(),
    GATHER_WOOD: uniqueId(),
    BUILD_STORAGE: uniqueId(),
    CREATE_TREE_FARM: uniqueId(),
    BUILD_ATTRACTIVE_HOUSE: uniqueId(),
    BUILD_HOUSE: uniqueId(),
    BUILD_LIBRARY: uniqueId(),
    BUILD_WAREHOUSE: uniqueId(),
    BUILD_GRANARY: uniqueId(),
    BUILD_SAWMILL: uniqueId(),
    BUILD_IRON_SMELTER: uniqueId(),
    BUILD_BLAST_FURNACE: uniqueId(),
}

export const EMPIRE_BUTTON_TEXTS = {
    [EMPIRE_BUTTON_TYPES.GATHER_FOOD]: 'Gather Food',
    [EMPIRE_BUTTON_TYPES.CREATE_FARM]: 'Create Farm',
    [EMPIRE_BUTTON_TYPES.GATHER_WOOD]: 'Gather Wood',
    [EMPIRE_BUTTON_TYPES.BUILD_STORAGE]: 'Build Storage',
    [EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM]: 'Create Tree Farm',
    [EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE]: 'Attractive House',
    [EMPIRE_BUTTON_TYPES.BUILD_HOUSE]: 'Build House',
    [EMPIRE_BUTTON_TYPES.BUILD_LIBRARY]: 'Build Library',
    [EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE]: 'Build Warehouse',
    [EMPIRE_BUTTON_TYPES.BUILD_GRANARY]: 'Build Granary',
    [EMPIRE_BUTTON_TYPES.BUILD_SAWMILL]: 'Build Sawmill',
    [EMPIRE_BUTTON_TYPES.BUILD_IRON_SMELTER]: 'Build Iron Smelter',
    [EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE]: 'Build Blast Furnace',
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
        resourcePrereqs: [],
        storyPrereq: STORY_PROGRESS_LIST['A2S1']
    },
    [EMPIRE_BUTTON_TYPES.BUILD_LIBRARY]: {
        sciencePrereqs: [],
        resourcePrereqs: [],
        storyPrereq: STORY_PROGRESS_LIST['A2S1']
    },
    [EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.COMPARTMENTALIZATION],
        resourcePrereqs: [],
    },
    [EMPIRE_BUTTON_TYPES.BUILD_GRANARY]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.CRANE],
        resourcePrereqs: [],
    },
    [EMPIRE_BUTTON_TYPES.BUILD_SAWMILL]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.CRANE],
        resourcePrereqs: [],
    },
    [EMPIRE_BUTTON_TYPES.BUILD_IRON_SMELTER]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.IRON_SMELTING],
        resourcePrereqs: [],
    },
    [EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.STEELMAKING],
        resourcePrereqs: [],
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
            type: RESOURCE_TYPES.WOOD,
            text: 'Wood',
            cost: 100,
        },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_LIBRARY]: [
        {
            type: RESOURCE_TYPES.WOOD,
            text: 'Wood',
            cost: 500,
        },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE]: [
        {
            type: RESOURCE_TYPES.WOOD,
            text: 'Wood',
            cost: 500,
        },
        {
            type: RESOURCE_TYPES.IRON,
            text: 'Iron',
            cost: 10,
        },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_GRANARY]: [
        {
            type: RESOURCE_TYPES.FOOD,
            text: 'Wood',
            cost: 400,
        },
        {
            type: RESOURCE_TYPES.WOOD,
            text: 'Wood',
            cost: 50,
        },
        {
            type: RESOURCE_TYPES.FURS,
            text: 'Furs',
            cost: 1,
        },
        {
            type: RESOURCE_TYPES.IRON,
            text: 'Iron',
            cost: 10,
        },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_SAWMILL]: [
        {
            type: RESOURCE_TYPES.WOOD,
            text: 'Wood', cost: 500,
        },
        { type: RESOURCE_TYPES.FURS, text: 'Furs', cost: 1, },
        { type: RESOURCE_TYPES.IRON, text: 'Iron', cost: 10, },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE]: [
        { type: RESOURCE_TYPES.WOOD, text: 'Wood', cost: 10000, },
        { type: RESOURCE_TYPES.RAW_ORE, text: 'Raw Ore', cost: 10000, },
        { type: RESOURCE_TYPES.COAL, text: 'Coal', cost: 1000, },
        { type: RESOURCE_TYPES.IRON, text: 'Iron', cost: 100, },
        { type: RESOURCE_TYPES.GOLD, text: 'Gold', cost: 10, },
    ],
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
        return val * 1.5 + 200
    },
    [EMPIRE_BUTTON_TYPES.BUILD_LIBRARY]: (val: number) => {
        return val * 1.5 + 300
    },
    [EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE]: (val: number) => {
        return val * 1.2 + 50
    },
    [EMPIRE_BUTTON_TYPES.BUILD_GRANARY]: (val: number) => {
        return val * 1.5 + 30
    },
    [EMPIRE_BUTTON_TYPES.BUILD_SAWMILL]: (val: number) => {
        return val * 1.5 + 30
    },
    [EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE]: (val: number) => {
        return val * 1.3
    },
}