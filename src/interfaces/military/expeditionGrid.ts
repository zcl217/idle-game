import type { ICoordinates } from "../common";
import type { ISprite } from "./sprite";

export interface IExpeditionCell {
    isPath: boolean;
    isDeployable: boolean;
    startOfPath: boolean;
    endOfPath: boolean;
    coordinates: ICoordinates;
    backgroundImage: string;
    enemyUnitList: ISprite[];
    enemyUnitArriving: boolean;
    playerUnit?: ISprite;
}