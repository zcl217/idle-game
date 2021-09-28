import type { ICoordinates } from "../common";
import type { ISprite } from "./sprite";

export interface EnemySpawnInfo {
    enemyUnit: ISprite;
    path: ICoordinates[];
    spawnDelay: number;
    intervalDelay: number;
    amount: number;
}

export interface PreviewInfo {
    sprite: ISprite;
    amount: number;
}
