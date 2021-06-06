import { RESOURCE_TYPES } from './resourceTypes';
import type { IResourceList } from '~/interfaces/resource'

export const INITIAL_RESOURCE_STATE: IResourceList = {
    [RESOURCE_TYPES.FOOD]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.WOOD]: {
        value: 10000000,
        limit: 10000000,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.FARMS]: {
        value: 0,
        generationValue: 1,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.TREE_FARM]: {
        value: 0,
        generationValue: 2,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.STORAGE]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.ATTRACTIVE_HOUSE]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.HOMES]: {
        value: 1,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.LIBRARIES]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.GRANARY]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.SAWMILL]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.IRON_SMELTER]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.BLAST_FURNACE]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.KNOWLEDGE]: {
        value: 100000000,
        limit: 100000000,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.RAW_ORE]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.COAL]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.IRON]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.STEEL]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.GOLD]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.FURS]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    }
}
