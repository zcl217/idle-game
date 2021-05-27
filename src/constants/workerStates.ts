import { WORKER_TYPES } from './workerTypes';

export const INITIAL_WORKER_STATE = {
    [WORKER_TYPES.FARMER]: {
        value: 0,
        generationValue: 10
    },
    [WORKER_TYPES.WOODCUTTER]: {
        value: 0,
        generationValue: 10
    },
    [WORKER_TYPES.SCHOLAR]: {
        value: 0,
        generationValue: 10
    },
    [WORKER_TYPES.MINER]: {
        value: 0,
        generationValue: 10
    },
}
