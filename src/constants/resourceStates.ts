import { RESOURCE_TYPES } from './resourceTypes';
import type { IResourceList } from '~/interfaces/resource'

export const INITIAL_RESOURCE_STATE: IResourceList = {
    [RESOURCE_TYPES.FOOD]: {
        value: 0,
        limit: 100,
    },
    [RESOURCE_TYPES.WOOD]: {
        value: 0,
        limit: 100,
    },
    [RESOURCE_TYPES.FARMS]: {
        value: 0,
        generationValue: 1,
        limit: Number.MAX_VALUE,
    },
    [RESOURCE_TYPES.TREE_FARM]: {
        value: 0,
        generationValue: 2,
        limit: Number.MAX_VALUE,
    },
    [RESOURCE_TYPES.STORAGE]: {
        value: 0,
        limit: 10,
    },
    [RESOURCE_TYPES.ATTRACTIVE_HOUSE]: {
        value: 0,
        limit: Number.MAX_VALUE,
    },
    [RESOURCE_TYPES.HOMES]: {
        value: 1,
        limit: Number.MAX_VALUE,
    },
    [RESOURCE_TYPES.KNOWLEDGE]: {
        value: 0,
        limit: Number.MAX_VALUE,
    },
    [RESOURCE_TYPES.GOLD]: {
        value: 0,
        limit: 100,
    }
}
