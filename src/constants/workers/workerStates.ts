import { WORKER_TYPES } from './workerTypes';

export const INITIAL_WORKER_STATE: Record<string, {value: number, generationValue: number}> = {
    [WORKER_TYPES.UNASSIGNED]: {
        value: 1,
        generationValue: 0,
    },
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
