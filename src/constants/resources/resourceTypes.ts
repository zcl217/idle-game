import { uniqueId } from "lodash"

export const RESOURCE_TYPES: Record<string, string> = {
    FOOD: uniqueId(),
    WOOD: uniqueId(),
    KNOWLEDGE: uniqueId(),
    RAW_ORE: uniqueId(),
    COAL: uniqueId(),
    IRON: uniqueId(),
    GOLD: uniqueId(),
    FURS: uniqueId(),
    STEEL: uniqueId(),
    FARMS: uniqueId(),
    TREE_FARM: uniqueId(),
    HOMES: uniqueId(),
    LIBRARIES: uniqueId(),
    STORAGE: uniqueId(),
    WAREHOUSE: uniqueId(),
    GRANARY: uniqueId(),
    SAWMILL: uniqueId(),
    IRON_SMELTER: uniqueId(),
    BLAST_FURNACE: uniqueId(),
    ATTRACTIVE_HOUSE: uniqueId(),
}

export const RESOURCE_NAMES: Record<string, string> = {
    [RESOURCE_TYPES.FOOD]: 'food',
    [RESOURCE_TYPES.FARMS]: 'farms',
    [RESOURCE_TYPES.WOOD]: 'wood',
    [RESOURCE_TYPES.STORAGE]: 'storages',
    [RESOURCE_TYPES.TREE_FARM]: 'tree farms',
    [RESOURCE_TYPES.HOMES]: 'homes',
    [RESOURCE_TYPES.LIBRARIES]: 'libraries',
    [RESOURCE_TYPES.KNOWLEDGE]: 'knowledge',
    [RESOURCE_TYPES.RAW_ORE]: 'raw ore',
    [RESOURCE_TYPES.COAL]: 'coal',
    [RESOURCE_TYPES.IRON]: 'iron',
    [RESOURCE_TYPES.GOLD]: 'gold',
    [RESOURCE_TYPES.FURS]: 'furs',
    [RESOURCE_TYPES.STEEL]: 'steel',
    [RESOURCE_TYPES.WAREHOUSE]: 'warehouses',
    [RESOURCE_TYPES.GRANARY]: 'granaries',
    [RESOURCE_TYPES.IRON_SMELTER]: 'iron smelter',
    [RESOURCE_TYPES.BLAST_FURNACE]: 'blast furnace',
    [RESOURCE_TYPES.SAWMILL]: 'sawmills',

}

export const GENERATABLE_RESOURCES = [
    RESOURCE_TYPES.FOOD,
    RESOURCE_TYPES.WOOD,
    RESOURCE_TYPES.KNOWLEDGE,
    RESOURCE_TYPES.RAW_ORE,
    RESOURCE_TYPES.COAL,
    RESOURCE_TYPES.IRON,
    RESOURCE_TYPES.GOLD,
    RESOURCE_TYPES.FURS,
    RESOURCE_TYPES.STEEL
]

export const RESOURCE_GENERATOR_MAP = {
    [RESOURCE_TYPES.FOOD]: RESOURCE_TYPES.FARMS,
    [RESOURCE_TYPES.WOOD]: RESOURCE_TYPES.TREE_FARM,

}
