import { RESOURCE_TYPES } from '../resources/resourceTypes';
import { uniqueId } from 'lodash'

export const BUTTON_WIDTH = 211;

export const BUTTON_CATEGORIES: Record<string, string> = {
    OTHER: 'other',
    EMPIRE: 'empire',
    SCIENCE: 'science',
    MILITARY: 'military',
}

// export const buttonTypeToResourceType = {
//     [EMPIRE_BUTTON_TYPES.GATHER_FOOD]: RESOURCE_TYPES.FOOD,
//     [EMPIRE_BUTTON_TYPES.CREATE_FARM]: RESOURCE_TYPES.FARMS,
//     [EMPIRE_BUTTON_TYPES.GATHER_WOOD]: RESOURCE_TYPES.WOOD,
//     [EMPIRE_BUTTON_TYPES.BUILD_STORAGE]: RESOURCE_TYPES.STORAGE,
//     [EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM]: RESOURCE_TYPES.TREE_FARM,
//     [EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE]: RESOURCE_TYPES.ATTRACTIVE_HOUSE,
//     [EMPIRE_BUTTON_TYPES.BUILD_HOUSE]: RESOURCE_TYPES.HOMES,
// }

export const TABS = {
    MAIN_1: 'main1',
    MAIN_2: 'main2',
    CHARACTER_CHOICE: 'charChoice',
    WORKERS: 'workers',
    SCIENCE: 'science',
    BARRACKS: 'barracks',
    EXPEDITION: 'expedition',
}