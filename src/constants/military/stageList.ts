import { uniqueId } from "lodash";
import type { ISprite } from "~/interfaces/military/sprite";
import { RESOURCE_TYPES } from "../resources/resourceTypes";
import { WOLF1, WOLF2, WOLF3 } from "./units/monsters";

export const STAGE_LIST: Record<string, string> = {
    '1-1': uniqueId(), '1-2': uniqueId(),
    '1-3': uniqueId(),
    '2-1': uniqueId(),
    '2-2': uniqueId(),
    '2-3': uniqueId(),
    '3-1': uniqueId(),
    '3-2': uniqueId(),
    '3-3': uniqueId(),
}

export const ENEMY_PREVIEW_LIST: Record<string, { sprite: ISprite, amount: number }[]> = {
    [STAGE_LIST["1-1"]]: [
        { sprite: WOLF1, amount: 5 }
    ],
    [STAGE_LIST["1-2"]]: [
        { sprite: WOLF1, amount: 7 },
        { sprite: WOLF2, amount: 2 }
    ],
    [STAGE_LIST["1-3"]]: [
        { sprite: WOLF1, amount: 15 },
        { sprite: WOLF2, amount: 5 },
        { sprite: WOLF3, amount: 1 }
    ],
    /*
    [STAGE_LIST["2-1"]]:
    [STAGE_LIST["2-2"]]:
    [STAGE_LIST["2-3"]]:
    [STAGE_LIST["3-1"]]:
    [STAGE_LIST["3-2"]]:
    [STAGE_LIST["3-3"]]:
    */
}

export const STAGE_REWARD_LIST: Record<string, { resource: string, amountPerSecond: number }[]> = {
    [STAGE_LIST["1-1"]]: [
        { resource: RESOURCE_TYPES.FURS, amountPerSecond: 1 },
        { resource: RESOURCE_TYPES.FOOD, amountPerSecond: 5 }
    ],
    [STAGE_LIST["1-2"]]: [
        { resource: RESOURCE_TYPES.FURS, amountPerSecond: 3 },
    ],
    [STAGE_LIST["1-3"]]: [
        { resource: RESOURCE_TYPES.FURS, amountPerSecond: 5 },
        { resource: RESOURCE_TYPES.IRON, amountPerSecond: 1 },
    ],
    /*
    [STAGE_LIST["2-1"]]:
    [STAGE_LIST["2-2"]]:
    [STAGE_LIST["2-3"]]:
    [STAGE_LIST["3-1"]]:
    [STAGE_LIST["3-2"]]:
    [STAGE_LIST["3-3"]]:
    */
}