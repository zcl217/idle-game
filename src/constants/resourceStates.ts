import { resourceTypes } from './resourceTypes';
import type { IResourceList } from '~/interfaces/resource'

export const initialResourceState: IResourceList = {
    [resourceTypes.FOOD]: {
        value: 0,
        limit: 100,
    },
    [resourceTypes.WOOD]: {
        value: 0,
        limit: 100,
    },
    [resourceTypes.FARMS]: {
        value: 0,
        generationValue: 1,
        limit: Number.MAX_VALUE,
    },
    [resourceTypes.TREE_FARM]: {
        value: 0,
        generationValue: 2,
        limit: Number.MAX_VALUE,
    },
    [resourceTypes.STORAGE]: {
        value: 0,
        limit: 10,
    },
    [resourceTypes.ATTRACTIVE_HOUSE]: {
        value: 0,
        limit: Number.MAX_VALUE,
    },
    [resourceTypes.HOMES]: {
        value: 1,
        limit: Number.MAX_VALUE,
    },
    [resourceTypes.KNOWLEDGE]: {
        value: 0,
        limit: Number.MAX_VALUE,
    },
    [resourceTypes.GOLD]: {
        value: 0,
        limit: 100,
    }
}
