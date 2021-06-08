
import { uniqueId } from 'lodash'
import { RESOURCE_TYPES } from '../resources/resourceTypes';
import type { IButtonCostList } from '~/interfaces/buttons';

export const MILITARY_BUTTON_TYPES = {
    TRAIN_SPEARMAN: uniqueId(),
    UPGRADE_SPEARMAN: uniqueId(),
    TRAIN_PIKEMAN: uniqueId(),
    UPGRADE_PIKEMAN: uniqueId(),
    TRAIN_FOOTPAD: uniqueId(),
    UPGRADE_FOOTPAD: uniqueId(),
    TRAIN_OUTLAW: uniqueId(),
    TRAIN_HALBERDIER: uniqueId(),
    TRAIN_HEAVY_INFANTRY: uniqueId(),
    UPGRADE_HEAVY_INFANTRY: uniqueId(),
    TRAIN_SHOCKTROOPER: uniqueId(),
    UPGRADE_SHOCKTROOPER: uniqueId(),
    TRAIN_SIEGETROOPER: uniqueId(),
    TRAIN_MAGE: uniqueId(),
    UPGRADE_MAGE: uniqueId(),
    TRAIN_GREAT_MAGE: uniqueId(),
    TRAIN_ARCH_MAGE: uniqueId(),
    DISABLED_TRAIN: uniqueId(),
    DISABLED_UPGRADE: uniqueId(),
}

export const MILITARY_BUTTON_TEXTS = {
    [MILITARY_BUTTON_TYPES.TRAIN_SPEARMAN]: 'Train',
    [MILITARY_BUTTON_TYPES.UPGRADE_SPEARMAN]: 'Upgrade',
    [MILITARY_BUTTON_TYPES.TRAIN_PIKEMAN]: 'Train',
    [MILITARY_BUTTON_TYPES.UPGRADE_PIKEMAN]: 'Upgrade',
    [MILITARY_BUTTON_TYPES.TRAIN_HALBERDIER]: 'Train',
    [MILITARY_BUTTON_TYPES.TRAIN_FOOTPAD]: 'Train',
    [MILITARY_BUTTON_TYPES.UPGRADE_FOOTPAD]: 'Upgrade',
    [MILITARY_BUTTON_TYPES.TRAIN_OUTLAW]: 'Train',
    [MILITARY_BUTTON_TYPES.TRAIN_HEAVY_INFANTRY]: 'Train',
    [MILITARY_BUTTON_TYPES.UPGRADE_HEAVY_INFANTRY]: 'Upgrade',
    [MILITARY_BUTTON_TYPES.TRAIN_SHOCKTROOPER]: 'Train',
    [MILITARY_BUTTON_TYPES.UPGRADE_SHOCKTROOPER]: 'Upgrade',
    [MILITARY_BUTTON_TYPES.TRAIN_SIEGETROOPER]: 'Train',
    [MILITARY_BUTTON_TYPES.TRAIN_MAGE]: 'Train',
    [MILITARY_BUTTON_TYPES.UPGRADE_MAGE]: 'Upgrade',
    [MILITARY_BUTTON_TYPES.TRAIN_ARCH_MAGE]: 'Train',
    [MILITARY_BUTTON_TYPES.DISABLED_TRAIN]: 'Upgrade',
    [MILITARY_BUTTON_TYPES.DISABLED_UPGRADE]: 'Upgrade',
}

export const MILITARY_BUTTON_COSTS: IButtonCostList = {
    /* TRAINING */
    [MILITARY_BUTTON_TYPES.TRAIN_SPEARMAN]: [
        { type: RESOURCE_TYPES.FOOD, text: 'Food', cost: 400, },
        { type: RESOURCE_TYPES.IRON, text: 'Iron', cost: 100, },
    ],
    [MILITARY_BUTTON_TYPES.TRAIN_FOOTPAD]: [
        { type: RESOURCE_TYPES.WOOD, text: 'Wood', cost: 1000, },
        { type: RESOURCE_TYPES.GOLD, text: 'Gold', cost: 20, },
    ],
    [MILITARY_BUTTON_TYPES.TRAIN_HEAVY_INFANTRY]: [
        { type: RESOURCE_TYPES.FOOD, text: 'Food', cost: 4000, },
        { type: RESOURCE_TYPES.STEEL, text: 'Steel', cost: 200, },
        { type: RESOURCE_TYPES.GOLD, text: 'Gold', cost: 100, },
    ],
    [MILITARY_BUTTON_TYPES.TRAIN_MAGE]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, text: 'Knowledge', cost: 3000, },
        { type: RESOURCE_TYPES.GOLD, text: 'Gold', cost: 150, },
    ],
    /* 
     *
        UPGRADING 
     *
    */
    [MILITARY_BUTTON_TYPES.UPGRADE_SPEARMAN]: [
        { type: RESOURCE_TYPES.FOOD, text: 'Food', cost: 2000, },
        { type: RESOURCE_TYPES.IRON, text: 'Iron', cost: 500, },
    ],
    [MILITARY_BUTTON_TYPES.UPGRADE_PIKEMAN]: [
        { type: RESOURCE_TYPES.FOOD, text: 'Food', cost: 10000, },
        { type: RESOURCE_TYPES.GOLD, text: 'Gold', cost: 1000, },
        { type: RESOURCE_TYPES.HALBERD_OF_ADUN, text: `Halberd of Adun`, cost: 1, },
    ],
    [MILITARY_BUTTON_TYPES.UPGRADE_FOOTPAD]: [
        { type: RESOURCE_TYPES.WOOD, text: 'Wood', cost: 10000, },
        { type: RESOURCE_TYPES.GOLD, text: 'Gold', cost: 1000, },
    ],
    [MILITARY_BUTTON_TYPES.UPGRADE_HEAVY_INFANTRY]: [
        { type: RESOURCE_TYPES.FOOD, text: 'Food', cost: 20000, },
        { type: RESOURCE_TYPES.STEEL, text: 'Steel', cost: 100, },
        { type: RESOURCE_TYPES.SINATRAS_SHATTERED_ARMOR, text: `Sinatra's Shattered Armor`, cost: 1, },
    ],
    [MILITARY_BUTTON_TYPES.UPGRADE_SHOCKTROOPER]: [
        { type: RESOURCE_TYPES.FOOD, text: 'Food', cost: 50000, },
        { type: RESOURCE_TYPES.STEEL, text: 'Steel', cost: 2000, },
        { type: RESOURCE_TYPES.GOLD, text: 'Gold', cost: 2500, },
        { type: RESOURCE_TYPES.LUTAREZS_WARHAMMER, text: `Lutarez's Warhammer`, cost: 1 }
    ],
    [MILITARY_BUTTON_TYPES.UPGRADE_MAGE]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, text: 'Knowledge', cost: 50000, },
        { type: RESOURCE_TYPES.GOLD, text: 'Gold', cost: 5000, },
        { type: RESOURCE_TYPES.AEDUS_TOME_OF_KNOWLEDGE, text: `Aedus' Tome of Knowledge`, cost: 1}
    ],
}