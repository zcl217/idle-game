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
    '3-1': '3-1',
    '3-2': '3-2',
    '3-3': '3-3',
}

export const ENEMY_PREVIEW_LIST: Record<string, { sprite: ISprite, amount: number }[]> = {
    [STAGE_LIST["1-1"]]: [
        { sprite: WOLF1, amount: 4 }
    ],
    [STAGE_LIST["1-2"]]: [
        { sprite: WOLF1, amount: 11 },
    ],
    [STAGE_LIST["1-3"]]: [
        { sprite: WOLF1, amount: 8 },
        { sprite: WOLF2, amount: 1 },
    ],
    [STAGE_LIST["1-4"]]: [
        { sprite: WOLF1, amount: 50 },
        { sprite: WOLF2, amount: 10 },
        { sprite: SKELETON_ARCHER, amount: 3 }
    ],
    [STAGE_LIST["1-5"]]: [
        { sprite: WOLF2, amount: 30 },
        { sprite: SKELETON_ARCHER, amount: 10 },
        { sprite: WOLF3, amount: 2 }
    ],
    [STAGE_LIST["2-1"]]: [
        { sprite: WOLF2, amount: 10 },
        { sprite: BAT, amount: 5 },
        { sprite: SKELETON, amount: 7 },
    ],
    [STAGE_LIST["2-2"]]: [
        { sprite: WOLF3, amount: 1 },
        { sprite: BAT, amount: 5 },
        { sprite: GHOST, amount: 3 },
    ]
    /*
    [STAGE_LIST["2-2"]]:
    [STAGE_LIST["2-3"]]:
    [STAGE_LIST["3-1"]]:
    [STAGE_LIST["3-2"]]:
    [STAGE_LIST["3-3"]]:
    */
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
        { resourceType: RESOURCE_TYPES.STEEL, amountPerSecond: 1 },
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