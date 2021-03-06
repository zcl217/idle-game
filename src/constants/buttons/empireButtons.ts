import { RESOURCE_TYPES } from '../resources/resourceTypes';
import type { IButtonCostList } from '~/interfaces/buttons';
import type { IPrereqsList } from '~/interfaces/common';
import { STORY_PROGRESS_LIST } from '~/constants/story';
import { SCIENCE_BUTTON_TYPES } from './scienceButtons';
import { STORAGE_CAPACITY } from '../gameState';

export const EMPIRE_BUTTON_TYPES: Record<string, string> = {
    GATHER_FOOD: 'gatherFood',
    CREATE_FARM: 'createFarm',
    GATHER_WOOD: 'gatherWood',
    CREATE_TREE_FARM: 'createTreeFarm',
    BUILD_STORAGE: 'buildStorage',
    BUILD_WAREHOUSE: 'buildWarehouse',
    BUILD_ATTRACTIVE_HOUSE: 'buildAttractiveHouse',
    BUILD_HOUSE: 'buildHouse',
    BUILD_LIBRARY: 'buildLibrary',
    BUILD_GRANARY: 'buildGranary',
    BUILD_SAWMILL: 'buildSawmill',
    BUILD_QUARRY: 'buildQuarry',
    BUILD_UNIVERSITY: 'buildUniversity',
    BUILD_WORKSHOP: 'buildWorkshop',
    BUILD_IRON_SMELTER: 'buildIronSmelter',
    BUILD_BLAST_FURNACE: 'buildBlastFurnace',
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
    [EMPIRE_BUTTON_TYPES.BUILD_QUARRY]: 'Build Quarry',
    [EMPIRE_BUTTON_TYPES.BUILD_UNIVERSITY]: 'Build University',
    [EMPIRE_BUTTON_TYPES.BUILD_WORKSHOP]: 'Build Workshop',
    [EMPIRE_BUTTON_TYPES.BUILD_IRON_SMELTER]: 'Build Iron Smelter',
    [EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE]: 'Build Blast Furnace',
}


export const BUTTON_RESOURCE_MAPPING = {
    [EMPIRE_BUTTON_TYPES.GATHER_FOOD]: RESOURCE_TYPES.FOOD,
    [EMPIRE_BUTTON_TYPES.CREATE_FARM]: RESOURCE_TYPES.FARM,
    [EMPIRE_BUTTON_TYPES.GATHER_WOOD]: RESOURCE_TYPES.WOOD,
    [EMPIRE_BUTTON_TYPES.BUILD_STORAGE]: RESOURCE_TYPES.STORAGE,
    [EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM]: RESOURCE_TYPES.TREE_FARM,
    [EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE]: RESOURCE_TYPES.ATTRACTIVE_HOUSE,
    [EMPIRE_BUTTON_TYPES.BUILD_HOUSE]: RESOURCE_TYPES.HOUSE,
    [EMPIRE_BUTTON_TYPES.BUILD_LIBRARY]: RESOURCE_TYPES.LIBRARY,
    [EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE]: RESOURCE_TYPES.WAREHOUSE,
    [EMPIRE_BUTTON_TYPES.BUILD_GRANARY]: RESOURCE_TYPES.GRANARY,
    [EMPIRE_BUTTON_TYPES.BUILD_SAWMILL]: RESOURCE_TYPES.SAWMILL,
    [EMPIRE_BUTTON_TYPES.BUILD_QUARRY]: RESOURCE_TYPES.QUARRY,
    [EMPIRE_BUTTON_TYPES.BUILD_UNIVERSITY]: RESOURCE_TYPES.UNIVERSITY,
    [EMPIRE_BUTTON_TYPES.BUILD_WORKSHOP]: RESOURCE_TYPES.WORKSHOP,
    [EMPIRE_BUTTON_TYPES.BUILD_IRON_SMELTER]: RESOURCE_TYPES.IRON_SMELTER,
    [EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE]: RESOURCE_TYPES.BLAST_FURNACE,
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
        resourcePrereqs: [RESOURCE_TYPES.FARM]
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
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.CRANE],
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
    [EMPIRE_BUTTON_TYPES.BUILD_QUARRY]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.CRANE],
        resourcePrereqs: [],
    },
    [EMPIRE_BUTTON_TYPES.BUILD_UNIVERSITY]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.CRANE],
        resourcePrereqs: [],
    },
    [EMPIRE_BUTTON_TYPES.BUILD_WORKSHOP]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.INDUSTRY],
        resourcePrereqs: [],
    },
    [EMPIRE_BUTTON_TYPES.BUILD_IRON_SMELTER]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.INDUSTRY, SCIENCE_BUTTON_TYPES.IRON_SMELTING],
        resourcePrereqs: [],
    },
    [EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.STEELMAKING],
        resourcePrereqs: [],
    },
}

export const INITIAL_EMPIRE_BUTTON_COSTS: IButtonCostList = {
    [EMPIRE_BUTTON_TYPES.CREATE_FARM]: [
        { type: RESOURCE_TYPES.FOOD, cost: 20 },
        { type: RESOURCE_TYPES.WOOD, cost: 10 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_STORAGE]: [
        { type: RESOURCE_TYPES.WOOD, cost: 50 },
    ],
    [EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM]: [
        { type: RESOURCE_TYPES.WOOD, cost: 50 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE]: [
        { type: RESOURCE_TYPES.FOOD, cost: 700 },
        { type: RESOURCE_TYPES.WOOD, cost: 700 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_HOUSE]: [
        { type: RESOURCE_TYPES.WOOD, cost: 100 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_LIBRARY]: [
        { type: RESOURCE_TYPES.WOOD, cost: 500 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE]: [
        { type: RESOURCE_TYPES.WOOD_PLANK, cost: 30 },
        { type: RESOURCE_TYPES.IRON, cost: 5 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_GRANARY]: [
        { type: RESOURCE_TYPES.FOOD, cost: 500 },
        { type: RESOURCE_TYPES.WOOD_PLANK, cost: 20 },
        { type: RESOURCE_TYPES.IRON, cost: 10 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_SAWMILL]: [
        { type: RESOURCE_TYPES.WOOD, cost: 500 },
        { type: RESOURCE_TYPES.WOOD_PLANK, cost: 20 },
        { type: RESOURCE_TYPES.IRON, cost: 10 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_QUARRY]: [
        { type: RESOURCE_TYPES.RAW_ORE, cost: 500 },
        { type: RESOURCE_TYPES.WOOD_PLANK, cost: 20 },
        { type: RESOURCE_TYPES.IRON, cost: 10 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_UNIVERSITY]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 500 },
        { type: RESOURCE_TYPES.FURS, cost: 100 },
        { type: RESOURCE_TYPES.WOOD_PLANK, cost: 20 },
        { type: RESOURCE_TYPES.IRON, cost: 10 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_WORKSHOP]: [
        { type: RESOURCE_TYPES.WOOD, cost: 3000 },
        { type: RESOURCE_TYPES.GOLD, cost: 1 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_IRON_SMELTER]: [
        { type: RESOURCE_TYPES.RAW_ORE, cost: 5000 },
        { type: RESOURCE_TYPES.COAL, cost: 500 },
        { type: RESOURCE_TYPES.WOOD_PLANK, cost: 100 },
        { type: RESOURCE_TYPES.GOLD, cost: 5 },
    ],
    [EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE]: [
        { type: RESOURCE_TYPES.RAW_ORE, cost: 10000 },
        { type: RESOURCE_TYPES.WOOD, cost: 5000 },
        { type: RESOURCE_TYPES.COAL, cost: 1000 },
        { type: RESOURCE_TYPES.WOOD_PLANK, cost: 200 },
        { type: RESOURCE_TYPES.IRON, cost: 100 },
        { type: RESOURCE_TYPES.GOLD, cost: 20 },
    ],
}

export const EMPIRE_COST_MULTIPLIERS = {
    [EMPIRE_BUTTON_TYPES.CREATE_FARM]: (val: number): number => {
        return val * 1.05 + 5
    },
    [EMPIRE_BUTTON_TYPES.BUILD_STORAGE]: (val: number): number => {
        return val + (STORAGE_CAPACITY * 0.5)
    },
    [EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM]: (val: number): number => {
        return val * 1.05
    },
    [EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE]: (val: number): number => {
        return Math.min(val * 1.3 + 33, 1000);
    },
    [EMPIRE_BUTTON_TYPES.BUILD_HOUSE]: (val: number): number => {
        return val * 1.2
    },
    [EMPIRE_BUTTON_TYPES.BUILD_LIBRARY]: (val: number): number => {
        return val * 1.2 + 300
    },
    [EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE]: (val: number): number => {
        return val * 1.1 + 10
    },
    [EMPIRE_BUTTON_TYPES.BUILD_GRANARY]: (val: number): number => {
        return val * 1.2 + 30
    },
    [EMPIRE_BUTTON_TYPES.BUILD_SAWMILL]: (val: number): number => {
        return val * 1.2 + 30
    },
    [EMPIRE_BUTTON_TYPES.BUILD_QUARRY]: (val: number): number => {
        return val * 1.2 + 30
    },
    [EMPIRE_BUTTON_TYPES.BUILD_UNIVERSITY]: (val: number): number => {
        return val * 1.2 + 30
    },
    [EMPIRE_BUTTON_TYPES.BUILD_WORKSHOP]: (val: number): number => {
        return val * 1.2
    },
    [EMPIRE_BUTTON_TYPES.BUILD_IRON_SMELTER]: (val: number): number => {
        return val * 1.2
    },
    [EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE]: (val: number): number => {
        return val * 1.2
    },
}

export const RESIDENTIAL_SECTOR_BUTTONS = new Set<string>([
    EMPIRE_BUTTON_TYPES.GATHER_FOOD,
    EMPIRE_BUTTON_TYPES.CREATE_FARM,
    EMPIRE_BUTTON_TYPES.GATHER_WOOD,
    EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM,
    EMPIRE_BUTTON_TYPES.BUILD_HOUSE,
    EMPIRE_BUTTON_TYPES.BUILD_LIBRARY,
    EMPIRE_BUTTON_TYPES.BUILD_UNIVERSITY
]);

export const STORAGE_SECTOR_BUTTONS = new Set<string>([
    EMPIRE_BUTTON_TYPES.BUILD_STORAGE,
    EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE,
    EMPIRE_BUTTON_TYPES.BUILD_GRANARY,
    EMPIRE_BUTTON_TYPES.BUILD_SAWMILL,
    EMPIRE_BUTTON_TYPES.BUILD_QUARRY
])

export const INDUSTRY_SECTOR_BUTTONS = new Set<string>([
    EMPIRE_BUTTON_TYPES.BUILD_WORKSHOP,
    EMPIRE_BUTTON_TYPES.BUILD_IRON_SMELTER,
    EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE
]);