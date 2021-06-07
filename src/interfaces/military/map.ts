import type { ICoordinates } from "~/interfaces/common"

export interface IMap {
    start: ICoordinates[];
    end: ICoordinates[];
    path: ICoordinates[];
    undeployable: ICoordinates[];
}