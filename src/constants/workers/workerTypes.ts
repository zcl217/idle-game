import { RESOURCE_TYPES } from '../resources/resourceTypes';

export const WORKER_TYPES = {
    UNASSIGNED: 'unassigned',
    FARMER: 'farmers',
    WOODCUTTER: 'woodcutters',
    SCHOLAR: 'scholars',
    MINER: 'miners'
}

export const WORKER_GENERATOR_MAP = {
    [RESOURCE_TYPES.FOOD]: WORKER_TYPES.FARMER,
    [RESOURCE_TYPES.WOOD]: WORKER_TYPES.WOODCUTTER,
    [RESOURCE_TYPES.KNOWLEDGE]: WORKER_TYPES.SCHOLAR,
    [RESOURCE_TYPES.RAW_ORE]: WORKER_TYPES.MINER,
    [RESOURCE_TYPES.COAL]: WORKER_TYPES.MINER,
    [RESOURCE_TYPES.GOLD]: WORKER_TYPES.MINER,
}
