import { workerTypes } from './workerTypes';

export const initialWorkerState = {
    [workerTypes.FARMER]: {
        value: 0,
        generationValue: 10
    },
    [workerTypes.WOODCUTTER]: {
        value: 0,
        generationValue: 10
    },
    [workerTypes.SCHOLAR]: {
        value: 0,
        generationValue: 10
    },
    [workerTypes.MINER]: {
        value: 0,
        generationValue: 10
    },
}
