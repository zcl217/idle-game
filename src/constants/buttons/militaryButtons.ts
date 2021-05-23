
import { uniqueId } from 'lodash'
import { resourceTypes } from '../resourceTypes';
import type { IButtonCostList } from '~/interfaces/buttons';
import type { IPrereqsList } from '~/interfaces/common';

export const militaryButtonTypes = {
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

export const militaryButtonTexts = {
    [militaryButtonTypes.TRAIN_SPEARMAN]: 'Train',
    [militaryButtonTypes.UPGRADE_SPEARMAN]: 'Upgrade',
    [militaryButtonTypes.TRAIN_PIKEMAN]: 'Train',
    [militaryButtonTypes.UPGRADE_SPEARMAN]: 'Upgrade',
    [militaryButtonTypes.TRAIN_HALBERDIER]: 'Train',
    [militaryButtonTypes.TRAIN_HEAVY_INFANTRY]: 'Train',
    [militaryButtonTypes.UPGRADE_HEAVY_INFANTRY]: 'Upgrade',
    [militaryButtonTypes.TRAIN_SHOCKTROOPER]: 'Train',
    [militaryButtonTypes.UPGRADE_SHOCKTROOPER]: 'Upgrade',
    [militaryButtonTypes.TRAIN_SIEGETROOPER]: 'Train',
    // [militaryButtonTypes.TRAIN_SPEARMAN]: 'Train Spearman',
    // [militaryButtonTypes.UPGRADE_SPEARMAN]: 'Upgrade Spearman',
    // [militaryButtonTypes.TRAIN_PIKEMAN]: 'Train Pikeman',
    // [militaryButtonTypes.UPGRADE_SPEARMAN]: 'Upgrade Pikeman',
    // [militaryButtonTypes.TRAIN_HALBERDIER]: 'Train Halberdier',
    // [militaryButtonTypes.TRAIN_HEAVY_INFANTRY]: 'Train Heavy Infantry',
    // [militaryButtonTypes.UPGRADE_HEAVY_INFANTRY]: 'Upgrade Heavy Infantry',
    // [militaryButtonTypes.TRAIN_SHOCKTROOPER]: 'Train Shocktrooper',
    // [militaryButtonTypes.UPGRADE_SHOCKTROOPER]: 'Upgrade Shocktrooper',
    // [militaryButtonTypes.TRAIN_SIEGETROOPER]: 'Train Siegetrooper',
}

export const militaryButtonCosts: IButtonCostList = {
    [militaryButtonTypes.TRAIN_SPEARMAN]: [
        {
            type: resourceTypes.FOOD,
            text: 'Food',
            cost: 20,
        },
        {
            type: resourceTypes.WOOD,
            text: 'Wood',
            cost: 10,
        },
    ],
    // [militaryButtonTypes.CREATE_FARM]: [
    //     {
    //         type: [resourceTypes.FOOD],
    //         text: 'Food',
    //         cost: 10,
    //     },
    //     {
    //         text:
    //     }
    // ],

}