import { resourceTypes } from '../resourceTypes';
import { uniqueId } from 'lodash'

export const BUTTON_WIDTH = 211;

export const BUTTON_CATEGORIES: Record<string, string> = {
    OTHER: 'other',
    EMPIRE: 'empire',
    SCIENCE: 'science',
    MILITARY: 'military',
}

export const OTHER_BUTTON_TYPES = {
    LORD_1: uniqueId(),
    LORD_2: uniqueId(),
}

export const OTHER_BUTTON_TEXTS = {
    [OTHER_BUTTON_TYPES.LORD_1]: 'Lord of Hope',
    [OTHER_BUTTON_TYPES.LORD_2]: 'Lord of Destruction',
}


// export const buttonTypeToResourceType = {
//     [empireButtonTypes.GATHER_FOOD]: resourceTypes.FOOD,
//     [empireButtonTypes.CREATE_FARM]: resourceTypes.FARMS,
//     [empireButtonTypes.GATHER_WOOD]: resourceTypes.WOOD,
//     [empireButtonTypes.BUILD_STORAGE]: resourceTypes.STORAGE,
//     [empireButtonTypes.CREATE_TREE_FARM]: resourceTypes.TREE_FARM,
//     [empireButtonTypes.BUILD_ATTRACTIVE_HOUSE]: resourceTypes.ATTRACTIVE_HOUSE,
//     [empireButtonTypes.BUILD_HOUSE]: resourceTypes.HOMES,
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