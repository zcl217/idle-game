import { resourceTypes } from './resourceTypes';

export const buttonTypes = {
    GATHER_FOOD: 1,
    CREATE_FARM: 2,
    GATHER_WOOD: 3,
    BUILD_STORAGE: 4,
}

export const buttonTexts = {
    [buttonTypes.GATHER_FOOD]: 'Gather Food',
    [buttonTypes.CREATE_FARM]: 'Create Farm',
    [buttonTypes.GATHER_WOOD]: 'Gather Wood',
    [buttonTypes.BUILD_STORAGE]: 'Build Storage',
}

export const buttonTypeToResourceType = {
    [buttonTypes.GATHER_FOOD]: resourceTypes.FOOD,
    [buttonTypes.CREATE_FARM]: resourceTypes.FARMS,
    [buttonTypes.GATHER_WOOD]: resourceTypes.WOOD,
    [buttonTypes.BUILD_STORAGE]: resourceTypes.STORAGE
}