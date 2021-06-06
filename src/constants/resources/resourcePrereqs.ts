import type { IPrereqsList } from "~/interfaces/common";
import { SCIENCE_BUTTON_TYPES } from "../buttons/scienceButtons";
import { RESOURCE_TYPES } from "./resourceTypes";

export const RESOURCE_DISPLAY_PREREQS: IPrereqsList = {
    [RESOURCE_TYPES.FOOD]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.WOOD]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.FARMS]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.TREE_FARM]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.FARMS]
    },
    [RESOURCE_TYPES.STORAGE]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.TREE_FARM]
    },
    [RESOURCE_TYPES.HOMES]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.LIBRARIES]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.LIBRARIES]
    },
    [RESOURCE_TYPES.BLAST_FURNACE]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.STEELMAKING],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.KNOWLEDGE]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.LIBRARIES]
    },
    [RESOURCE_TYPES.RAW_ORE]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.ORE_MINING],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.COAL]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.ORE_MINING],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.GOLD]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.ORE_MINING],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.IRON]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.IRON_SMELTING],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.STEEL]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.STEELMAKING],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.FURS]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.BARRACKS],
        resourcePrereqs: []
    },
}