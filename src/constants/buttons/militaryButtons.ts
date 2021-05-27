
import { uniqueId } from 'lodash'
import { RESOURCE_TYPES } from '../resourceTypes';
import type { IButtonCostList } from '~/interfaces/buttons';
import type { IPrereqsList } from '~/interfaces/common';

export const MILITARY_BUTTON_TYPES = {
    HIGHLIGHT_CELLS: uniqueId(),
    TRAIN_SPEARMAN: uniqueId(),
    UPGRADE_SPEARMAN: uniqueId(),
    TRAIN_PIKEMAN: uniqueId(),
    UPGRADE_PIKEMAN: uniqueId(),
    TRAIN_HALBERDIER: uniqueId(),
    TRAIN_HEAVY_INFANTRY: uniqueId(),
    UPGRADE_HEAVY_INFANTRY: uniqueId(),
    TRAIN_SHOCKTROOPER: uniqueId(),
    UPGRADE_SHOCKTROOPER: uniqueId(),
    TRAIN_SIEGETROOPER: uniqueId(),
}

export const MILITARY_BUTTON_TEXTS = {
    [MILITARY_BUTTON_TYPES.TRAIN_SPEARMAN]: 'Train',
    [MILITARY_BUTTON_TYPES.UPGRADE_SPEARMAN]: 'Upgrade',
    [MILITARY_BUTTON_TYPES.TRAIN_PIKEMAN]: 'Train',
    [MILITARY_BUTTON_TYPES.UPGRADE_SPEARMAN]: 'Upgrade',
    [MILITARY_BUTTON_TYPES.TRAIN_HALBERDIER]: 'Train',
    [MILITARY_BUTTON_TYPES.TRAIN_HEAVY_INFANTRY]: 'Train',
    [MILITARY_BUTTON_TYPES.UPGRADE_HEAVY_INFANTRY]: 'Upgrade',
    [MILITARY_BUTTON_TYPES.TRAIN_SHOCKTROOPER]: 'Train',
    [MILITARY_BUTTON_TYPES.UPGRADE_SHOCKTROOPER]: 'Upgrade',
    [MILITARY_BUTTON_TYPES.TRAIN_SIEGETROOPER]: 'Train',
    // [MILITARY_BUTTON_TYPES.TRAIN_SPEARMAN]: 'Train Spearman',
    // [MILITARY_BUTTON_TYPES.UPGRADE_SPEARMAN]: 'Upgrade Spearman',
    // [MILITARY_BUTTON_TYPES.TRAIN_PIKEMAN]: 'Train Pikeman',
    // [MILITARY_BUTTON_TYPES.UPGRADE_SPEARMAN]: 'Upgrade Pikeman',
    // [MILITARY_BUTTON_TYPES.TRAIN_HALBERDIER]: 'Train Halberdier',
    // [MILITARY_BUTTON_TYPES.TRAIN_HEAVY_INFANTRY]: 'Train Heavy Infantry',
    // [MILITARY_BUTTON_TYPES.UPGRADE_HEAVY_INFANTRY]: 'Upgrade Heavy Infantry',
    // [MILITARY_BUTTON_TYPES.TRAIN_SHOCKTROOPER]: 'Train Shocktrooper',
    // [MILITARY_BUTTON_TYPES.UPGRADE_SHOCKTROOPER]: 'Upgrade Shocktrooper',
    // [MILITARY_BUTTON_TYPES.TRAIN_SIEGETROOPER]: 'Train Siegetrooper',
}

export const MILITARY_BUTTON_COSTS: IButtonCostList = {
    [MILITARY_BUTTON_TYPES.TRAIN_SPEARMAN]: [
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
    // [MILITARY_BUTTON_TYPES.CREATE_FARM]: [
    //     {
    //         type: [RESOURCE_TYPES.FOOD],
    //         text: 'Food',
    //         cost: 10,
    //     },
    //     {
    //         text:
    //     }
    // ],

}