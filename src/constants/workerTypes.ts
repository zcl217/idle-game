import { resourceTypes } from './resourceTypes';

export const workerTypes = {
    FARMER: 'farmer',
    WOODCUTTER: 'woodcutter',
    SCHOLAR: 'scholar',
    MINER: 'miner'
}

export const workerGeneratorMap = {
    [resourceTypes.FOOD]: workerTypes.FARMER,
    [resourceTypes.WOOD]: workerTypes.WOODCUTTER,
}
