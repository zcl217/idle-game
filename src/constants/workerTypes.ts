import { RESOURCE_TYPES } from './resourceTypes';

export const WORKER_TYPES = {
    FARMER: 'farmer',
    WOODCUTTER: 'woodcutter',
    SCHOLAR: 'scholar',
    MINER: 'miner'
}

export const WORKER_GENERATOR_MAP = {
    [RESOURCE_TYPES.FOOD]: WORKER_TYPES.FARMER,
    [RESOURCE_TYPES.WOOD]: WORKER_TYPES.WOODCUTTER,
}
