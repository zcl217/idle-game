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
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.WORKERS],
        resourcePrereqs: []
    },
    [RESOURCE_TYPES.KNOWLEDGE]: {
        sciencePrereqs: [],
        resourcePrereqs: [RESOURCE_TYPES.LIBRARIES]
    },
}