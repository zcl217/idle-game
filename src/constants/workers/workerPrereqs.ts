import type { IPrereqsList } from "~/interfaces/common";
import { WORKER_TYPES } from "./workerTypes";

export const WORKER_PREREQS: IPrereqsList = {
    [WORKER_TYPES.FARMER]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [WORKER_TYPES.WOODCUTTER]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [WORKER_TYPES.SCHOLAR]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [WORKER_TYPES.HUNTER]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [WORKER_TYPES.MINER]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
}