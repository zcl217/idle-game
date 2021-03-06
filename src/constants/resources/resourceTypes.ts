export const RESOURCE_TYPES: Record<string, string> = {
    FOOD: 'food',
    WOOD: 'wood',
    KNOWLEDGE: 'knowledge',
    RAW_ORE: 'rawOre',
    COAL: 'coal',
    WOOD_PLANK: 'woodPlank',
    IRON: 'iron',
    GOLD: 'gold',
    FURS: 'furs',
    STEEL: 'steel',
    FARM: 'farm',
    TREE_FARM: 'treeFarm',
    HOUSE: 'home',
    LIBRARY: 'library',
    STORAGE: 'storage',
    WAREHOUSE: 'warehouse',
    GRANARY: 'granary',
    SAWMILL: 'sawmill',
    UNIVERSITY: 'university',
    WORKSHOP: 'workshop',
    IRON_SMELTER: 'ironSmelter',
    BLAST_FURNACE: 'blastFurnace',
    ATTRACTIVE_HOUSE: 'attractiveHouse',
    SINATRAS_SHATTERED_ARMOR: 'sinatraShatteredArmor',
    HALBERD_OF_ADUN: 'halberdOfAdun',
    LUTAREZS_WARHAMMER: 'lutarezWarhammer',
    AEDUS_TOME_OF_KNOWLEDGE: 'aedusTomeOfKnowledge',
    GEM_OF_ETHEREALITY: 'gemOfEthereality'
}

export const RESOURCE_NAMES: Record<string, string> = {
    [RESOURCE_TYPES.FOOD]: 'food',
    [RESOURCE_TYPES.FARM]: 'farms',
    [RESOURCE_TYPES.WOOD]: 'wood',
    [RESOURCE_TYPES.TREE_FARM]: 'tree farms',
    [RESOURCE_TYPES.STORAGE]: 'storages',
    [RESOURCE_TYPES.HOUSE]: 'homes',
    [RESOURCE_TYPES.LIBRARY]: 'libraries',
    [RESOURCE_TYPES.KNOWLEDGE]: 'knowledge',
    [RESOURCE_TYPES.RAW_ORE]: 'raw ore',
    [RESOURCE_TYPES.COAL]: 'coal',
    [RESOURCE_TYPES.WOOD_PLANK]: 'wood planks',
    [RESOURCE_TYPES.IRON]: 'iron',
    [RESOURCE_TYPES.GOLD]: 'gold',
    [RESOURCE_TYPES.FURS]: 'furs',
    [RESOURCE_TYPES.STEEL]: 'steel',
    [RESOURCE_TYPES.WAREHOUSE]: 'warehouses',
    [RESOURCE_TYPES.GRANARY]: 'granaries',
    [RESOURCE_TYPES.SAWMILL]: 'sawmills',
    [RESOURCE_TYPES.UNIVERSITY]: 'universities',
    [RESOURCE_TYPES.WORKSHOP]: 'workshops',
    [RESOURCE_TYPES.IRON_SMELTER]: 'smelters',
    [RESOURCE_TYPES.BLAST_FURNACE]: 'furnaces',
    [RESOURCE_TYPES.SINATRAS_SHATTERED_ARMOR]: `Sinatra's Shattered Armor`,
    [RESOURCE_TYPES.HALBERD_OF_ADUN]: 'Halberd of Adun',
    [RESOURCE_TYPES.LUTAREZS_WARHAMMER]: `Lutarez's Warhammer`,
    [RESOURCE_TYPES.AEDUS_TOME_OF_KNOWLEDGE]: `Aedus' Tome of Knowledge`,
    [RESOURCE_TYPES.GEM_OF_ETHEREALITY]: `Gem of Ethereality`,
}

export const SPECIAL_RESOURCES = new Set<string>([
    RESOURCE_TYPES.SINATRAS_SHATTERED_ARMOR,
    RESOURCE_TYPES.HALBERD_OF_ADUN,
    RESOURCE_TYPES.LUTAREZS_WARHAMMER,
    RESOURCE_TYPES.AEDUS_TOME_OF_KNOWLEDGE,
])

export const GENERATABLE_RESOURCES = [
    RESOURCE_TYPES.FOOD,
    RESOURCE_TYPES.WOOD,
    RESOURCE_TYPES.KNOWLEDGE,
    RESOURCE_TYPES.RAW_ORE,
    RESOURCE_TYPES.COAL,
    RESOURCE_TYPES.WOOD_PLANK,
    RESOURCE_TYPES.IRON,
    RESOURCE_TYPES.GOLD,
    RESOURCE_TYPES.FURS,
    RESOURCE_TYPES.STEEL
]

export const RESOURCE_GENERATOR_MAP = {
    [RESOURCE_TYPES.FOOD]: RESOURCE_TYPES.FARM,
    [RESOURCE_TYPES.WOOD]: RESOURCE_TYPES.TREE_FARM,

}
