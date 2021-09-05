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
    [RESOURCE_TYPES.FARM]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.TREE_FARM]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.FARM]
    },
    [RESOURCE_TYPES.STORAGE]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.TREE_FARM]
    },
    [RESOURCE_TYPES.HOUSE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.KNOWLEDGE]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.ATHENAEUM]
    },
    [RESOURCE_TYPES.RAW_ORE]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.ORE_MINING],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.COAL]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.ORE_MINING],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.WOOD_PLANK]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.WORKSHOP]
    },
    [RESOURCE_TYPES.IRON]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.IRON_SMELTER]
    },
    [RESOURCE_TYPES.GOLD]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.ORE_MINING],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.FURS]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.HUNTERS],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.STEEL]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.BLAST_FURNACE]
    },
    [RESOURCE_TYPES.MITHRIL]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.MITHRIL],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.MITHRIL_ALLOY]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.MITHRIL_FURNACE]
    },
    [RESOURCE_TYPES.ADAMANTITE]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.ADAMANTITE],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.ADAMANTITE_ALLOY]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.MAGIC_FURNACE]
    },
    [RESOURCE_TYPES.WAREHOUSE]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.WAREHOUSE]
    },
    [RESOURCE_TYPES.GRANARY]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.GRANARY]
    },
    [RESOURCE_TYPES.SAWMILL]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.SAWMILL]
    },
    [RESOURCE_TYPES.UNIVERSITY]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.UNIVERSITY]
    },
    [RESOURCE_TYPES.WORKSHOP]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.WORKSHOP]
    },
    [RESOURCE_TYPES.IRON_SMELTER]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.IRON_SMELTER]
    },
    [RESOURCE_TYPES.BLAST_FURNACE]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.BLAST_FURNACE]
    },
    [RESOURCE_TYPES.MITHRIL_FURNACE]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.MITHRIL_FURNACE]
    },
    [RESOURCE_TYPES.MAGIC_FURNACE]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.MAGIC_FURNACE]
    },
}