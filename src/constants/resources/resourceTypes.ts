import type { IPrereqsList } from "~/interfaces/common"
import { SCIENCE_BUTTON_TYPES } from "../buttons/scienceButtons"

export const RESOURCE_TYPES = {
    FOOD: 'food',
    FARMS: 'farms',
    WOOD: 'wood',
    STORAGE: 'storages',
    TREE_FARM: 'tree farms',
    ATTRACTIVE_HOUSE: 'attractive house',
    GOLD: 'gold',
    HOMES: 'homes',
    LIBRARIES: 'libraries',
    KNOWLEDGE: 'knowledge',
}

export const GENERATABLE_RESOURCES = [
    RESOURCE_TYPES.FOOD,
    RESOURCE_TYPES.WOOD,
    RESOURCE_TYPES.GOLD,
    RESOURCE_TYPES.KNOWLEDGE
]

export const RESOURCE_GENERATOR_MAP = {
    [RESOURCE_TYPES.FOOD]: RESOURCE_TYPES.FARMS,
    [RESOURCE_TYPES.WOOD]: RESOURCE_TYPES.TREE_FARM,

}
