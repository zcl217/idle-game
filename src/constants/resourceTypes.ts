import type { IPrereqsList } from "~/interfaces/common"
import { scienceButtonTypes } from "./buttons/scienceButtons"

export const resourceTypes = {
    FOOD: 'food',
    FARMS: 'farms',
    WOOD: 'wood',
    STORAGE: 'storages',
    TREE_FARM: 'tree farms',
    ATTRACTIVE_HOUSE: 'attractive house',
    GOLD: 'gold',
    HOMES: 'homes',
    KNOWLEDGE: 'knowledge',
}

export const generatableResources = [
    resourceTypes.FOOD,
    resourceTypes.WOOD,
    resourceTypes.GOLD,
    resourceTypes.KNOWLEDGE
]

export const resourceGeneratorMap = {
    [resourceTypes.FOOD]: resourceTypes.FARMS,
    [resourceTypes.WOOD]: resourceTypes.TREE_FARM,

}

export const resourceDisplayPrereqs: IPrereqsList = {
    [resourceTypes.FOOD]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [resourceTypes.WOOD]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [resourceTypes.FARMS]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [resourceTypes.TREE_FARM]: {
        sciencePrereqs: [],
        resourcePrereqs: [resourceTypes.FARMS]
    },
    [resourceTypes.STORAGE]: {
        sciencePrereqs: [],
        resourcePrereqs: [resourceTypes.TREE_FARM]
    },
    [resourceTypes.HOMES]: {
        sciencePrereqs: [scienceButtonTypes.WORKERS],
        resourcePrereqs: []
    },
}