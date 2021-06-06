import type { EnemySpawnInfo } from "~/interfaces/military/enemySpawnInfo";
import { UNIT_PATHS } from "./maps";
import { STAGE_LIST } from "./stageList";
import { WOLF1 } from "./units/monsters";


export const ENEMY_SPAWN_LIST: Record<string, EnemySpawnInfo[]> = {
    [STAGE_LIST["1-1"]]: [
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 3000, intervalDelay: 10000, amount: 2 },
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_2, spawnDelay: 7000, intervalDelay: 10000, amount: 2 }
    ],
    [STAGE_LIST["1-2"]]: [
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 3000, intervalDelay: 10000, amount: 1 },
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_2, spawnDelay: 7000, intervalDelay: 10000, amount: 1 }
    ],
    [STAGE_LIST["1-3"]]: [
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 3000, intervalDelay: 10000, amount: 1 }
    ],
    /*

[STAGE_LIST["1-3"]]: [
    { resource: RESOURCE_TYPES.FURS, amountPerSecond: 5 },
    { resource: RESOURCE_TYPES.IRON, amountPerSecond: 1 },
],

[STAGE_LIST["2-1"]]:
[STAGE_LIST["2-2"]]:
[STAGE_LIST["2-3"]]:
[STAGE_LIST["3-1"]]:
[STAGE_LIST["3-2"]]:
[STAGE_LIST["3-3"]]:
*/
}