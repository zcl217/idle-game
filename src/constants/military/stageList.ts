import type { ISprite } from "~/interfaces/military/sprite";
import { RESOURCE_TYPES } from "../resources/resourceTypes";
import { BAT, GHOST, SKELETON, SKELETON_ARCHER, WOLF1, WOLF2, WOLF3 } from "./units/monsters";

export const STAGE_LIST: Record<string, string> = {
    '1-1': '1-1',
    '1-2': '1-2',
    '1-3': '1-3',
    '1-4': '1-4',
    '1-5': '1-5',
    '2-1': '2-1',
    '2-2': '2-2',
    '2-3': '2-3',
    '2-4': '2-4',
    '2-5': '2-5',
    '3-1': '3-1',
    '3-2': '3-2',
    '3-3': '3-3',
}

export const STAGE_REWARD_LIST: Record<string, { resourceType: string, amountPerSecond: number }[]> = {
    [STAGE_LIST["1-1"]]: [
        { resourceType: RESOURCE_TYPES.FURS, amountPerSecond: 1 },
        { resourceType: RESOURCE_TYPES.FOOD, amountPerSecond: 5 }
    ],
    [STAGE_LIST["1-2"]]: [
        { resourceType: RESOURCE_TYPES.FURS, amountPerSecond: 3 },
    ],
    [STAGE_LIST["1-3"]]: [
        { resourceType: RESOURCE_TYPES.FURS, amountPerSecond: 5 },
        { resourceType: RESOURCE_TYPES.FOOD, amountPerSecond: 10 }
    ],
    [STAGE_LIST["1-4"]]: [
        { resourceType: RESOURCE_TYPES.FURS, amountPerSecond: 7 },
        { resourceType: RESOURCE_TYPES.IRON, amountPerSecond: 1 },
    ],
    [STAGE_LIST["1-5"]]: [
        { resourceType: RESOURCE_TYPES.SINATRAS_SHATTERED_ARMOR, amountPerSecond: 0 },
        { resourceType: RESOURCE_TYPES.GEM_OF_ETHEREALITY, amountPerSecond: 0 }
    ],
    
    [STAGE_LIST["2-1"]]: [
    ],
    [STAGE_LIST["2-2"]]:[
    ],
    [STAGE_LIST["2-3"]]:[
    ],
    /*
    [STAGE_LIST["3-1"]]:
    [STAGE_LIST["3-2"]]:
    [STAGE_LIST["3-3"]]:
    */
}

export const ALL_CLEAR_REWARDS: Record<number, string[]> = {
    1: [
        `Sinatra's Shattered Armor x 1`,
        `Gem of Ethereality x 1`
    ],
    2: [
        `Lutarez's Warhammer x 1`,
        `Halberd of Adun x 1`,
        `Aedus' Tome of Knowledge x 1`
    ],
    3: [
        ``
    ]
}