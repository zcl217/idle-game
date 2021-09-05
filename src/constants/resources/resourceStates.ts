import { RESOURCE_TYPES } from './resourceTypes';
import type { IResourceList } from '~/interfaces/resource'

export const INITIAL_RESOURCE_STATE: IResourceList = {
    [RESOURCE_TYPES.FOOD]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.WOOD]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.KNOWLEDGE]: {
        value: 0,
        limit: 100,
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
    [RESOURCE_TYPES.WOOD_PLANK]: {
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
    [RESOURCE_TYPES.MITHRIL]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.MITHRIL_ALLOY]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.ADAMANTITE]: {
        value: 0,
        limit: 100,
        displayGenerationRate: true
    },
    [RESOURCE_TYPES.ADAMANTITE_ALLOY]: {
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
    },
    [RESOURCE_TYPES.FARM]: {
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
    [RESOURCE_TYPES.WAREHOUSE]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.ATTRACTIVE_HOUSE]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.HOUSE]: {
        value: 1,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.MANSION]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.TAVERN]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.ATHENAEUM]: {
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
    [RESOURCE_TYPES.QUARRY]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.UNIVERSITY]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.WORKSHOP]: {
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
    [RESOURCE_TYPES.MITHRIL_FURNACE]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.MAGIC_FURNACE]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.SINATRAS_SHATTERED_ARMOR]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.HALBERD_OF_ADUN]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.LUTAREZS_WARHAMMER]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.AEDUS_TOME_OF_KNOWLEDGE]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
    [RESOURCE_TYPES.GEM_OF_ETHEREALITY]: {
        value: 0,
        limit: Number.MAX_VALUE,
        displayGenerationRate: false
    },
}
