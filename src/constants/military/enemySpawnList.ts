import type { EnemySpawnInfo } from "~/interfaces/military/enemySpawnInfo";
import { UNIT_PATHS } from "./maps";
import { STAGE_LIST } from "./stageList";
import { BAT, GHOST, SKELETON, SKELETON_ARCHER, WOLF1, WOLF2, WOLF3 } from "./units/monsters";


export const ENEMY_SPAWN_LIST: Record<string, EnemySpawnInfo[]> = {
    [STAGE_LIST["1-1"]]: [
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 3000, intervalDelay: 10000, amount: 2 },
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_2, spawnDelay: 7000, intervalDelay: 10000, amount: 2 }
    ],
    [STAGE_LIST["1-2"]]: [
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 3000, intervalDelay: 5000, amount: 5 },
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_2, spawnDelay: 7000, intervalDelay: 5000, amount: 4 },
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_3, spawnDelay: 10000, intervalDelay: 1000, amount: 2 }
    ],
    [STAGE_LIST["1-3"]]: [
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 3000, intervalDelay: 3000, amount: 4 },
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_2, spawnDelay: 7000, intervalDelay: 4000, amount: 2 },
        { enemyUnit: WOLF2, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 12000, intervalDelay: 1000, amount: 1 },
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_2, spawnDelay: 15000, intervalDelay: 1000, amount: 2 },
    ],
    [STAGE_LIST["1-4"]]: [
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 3000, intervalDelay: 1000, amount: 50 },
        { enemyUnit: WOLF2, path: UNIT_PATHS.MAP_1.PATH_3, spawnDelay: 15000, intervalDelay: 4000, amount: 10 },
        { enemyUnit: SKELETON_ARCHER, path: UNIT_PATHS.MAP_1.PATH_2, spawnDelay: 10000, intervalDelay: 5000, amount: 3 },
    ],
    [STAGE_LIST["1-5"]]: [
        { enemyUnit: WOLF2, path: UNIT_PATHS.MAP_1.PATH_3, spawnDelay: 3000, intervalDelay: 6000, amount: 15 },
        { enemyUnit: WOLF2, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 3000, intervalDelay: 4000, amount: 15 },
        { enemyUnit: SKELETON_ARCHER, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 5000, intervalDelay: 2000, amount: 10 },
        { enemyUnit: WOLF3, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 20000, intervalDelay: 20000, amount: 2 }
    ],
    [STAGE_LIST["2-1"]]: [
        { enemyUnit: BAT, path: UNIT_PATHS.MAP_2.PATH_6, spawnDelay: 3000, intervalDelay: 2000, amount: 5 },
        { enemyUnit: SKELETON, path: UNIT_PATHS.MAP_2.PATH_2, spawnDelay: 1000, intervalDelay: 5000, amount: 5 },
        { enemyUnit: WOLF2, path: UNIT_PATHS.MAP_2.PATH_3, spawnDelay: 1000, intervalDelay: 3000, amount: 10 },
        { enemyUnit: SKELETON, path: UNIT_PATHS.MAP_2.PATH_4, spawnDelay: 5000, intervalDelay: 3000, amount: 2 },
    ],
    [STAGE_LIST["2-2"]]: [
        { enemyUnit: BAT, path: UNIT_PATHS.MAP_2.PATH_1, spawnDelay: 3000, intervalDelay: 5000, amount: 5 },
        { enemyUnit: WOLF3, path: UNIT_PATHS.MAP_2.PATH_2, spawnDelay: 10000, intervalDelay: 5000, amount: 1 },
        { enemyUnit: GHOST, path: UNIT_PATHS.MAP_2.PATH_8, spawnDelay: 5000, intervalDelay: 5000, amount: 3 }
    ],
    [STAGE_LIST["2-3"]]: [
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 3000, intervalDelay: 3000, amount: 4 },
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_2, spawnDelay: 7000, intervalDelay: 4000, amount: 2 },
        { enemyUnit: WOLF2, path: UNIT_PATHS.MAP_1.PATH_1, spawnDelay: 12000, intervalDelay: 1000, amount: 1 },
        { enemyUnit: WOLF1, path: UNIT_PATHS.MAP_1.PATH_2, spawnDelay: 15000, intervalDelay: 1000, amount: 2 },
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