import { resourceTypes } from '../resourceTypes';
import { uniqueId } from 'lodash'

export const buttonWidth = 211;

export const buttonCategories = {
    OTHER: 'other',
    EMPIRE: 'empire',
    SCIENCE: 'science'
}

export const otherButtonTypes = {
    LORD_1: uniqueId(),
    LORD_2: uniqueId(),
}

export const otherButtonTexts = {
    [otherButtonTypes.LORD_1]: 'Lord of Hope',
    [otherButtonTypes.LORD_2]: 'Lord of Destruction',
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

export const tabs = {
    MAIN_1: 'main1',
    MAIN_2: 'main2',
    CHARACTER_CHOICE: 'charChoice',
    WORKERS: 'workers',
    SCIENCE: 'science',
    MILITARY: 'military',
}