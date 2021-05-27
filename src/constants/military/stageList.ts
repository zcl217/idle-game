import { uniqueId } from "lodash";
import type { ISprite } from "~/interfaces/military/sprite";
import { WOLF1, WOLF2, WOLF3 } from "./units/monsters";

export const STAGE_LIST: Record<string, string> = {
    '1-1': uniqueId(),
    '1-2': uniqueId(),
    '1-3': uniqueId(),
    '2-1': uniqueId(),
    '2-2': uniqueId(),
    '2-3': uniqueId(),
    '3-1': uniqueId(),
    '3-2': uniqueId(),
    '3-3': uniqueId(),
}

export const ENEMY_PREVIEW_LIST: Record<string, { sprite: ISprite, count: number }[]> = {
    [STAGE_LIST["1-1"]]: [
        {
            sprite: WOLF1,
            count: 5
        }
    ],
    [STAGE_LIST["1-2"]]: [
        {
            sprite: WOLF1,
            count: 7
        },
        {
            sprite: WOLF2,
            count: 2
        }
    ],
    [STAGE_LIST["1-3"]]: [
        {
            sprite: WOLF1,
            count: 15
        },
        {
            sprite: WOLF2,
            count: 5
        },
        {
            sprite: WOLF3,
            count: 1
        }
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