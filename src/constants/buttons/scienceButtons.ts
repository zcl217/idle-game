
import { uniqueId } from 'lodash'
import type { IPrereqsList } from '~/interfaces/common';

export const SCIENCE_BUTTON_TYPES = {
    WORKERS: uniqueId(),
    WOODEN_AXE: uniqueId(),
    IRON_AXE: uniqueId(),
    STEEL_AXE: uniqueId(),
    WOODEN_HOE: uniqueId(),
    IRON_HOE: uniqueId(),
    STEEL_HOE: uniqueId(),
    WOODEN_PICKAXE: uniqueId(),
    IRON_PICKAXE: uniqueId(),
    STEEL_PICKAXE: uniqueId(),
    LIBRARY: uniqueId(),
    ORE_MINING: uniqueId(),
    IRON_SMELTING: uniqueId(),
    STEELMAKING: uniqueId(),
    

}

export const SCIENCE_BUTTON_TEXTS = {
    [SCIENCE_BUTTON_TYPES.WOODEN_AXE]: 'Wooden Axe',
    [SCIENCE_BUTTON_TYPES.IRON_AXE]: 'Iron Axe',
    [SCIENCE_BUTTON_TYPES.STEEL_AXE]: 'Steel Axe',
    [SCIENCE_BUTTON_TYPES.WOODEN_HOE]: 'Wooden Hoe',
    [SCIENCE_BUTTON_TYPES.IRON_HOE]: 'Iron Hoe',
    [SCIENCE_BUTTON_TYPES.STEEL_HOE]: 'Steel Hoe',
    [SCIENCE_BUTTON_TYPES.LIBRARY]: 'Library',
    [SCIENCE_BUTTON_TYPES.ORE_MINING]: 'Ore Mining',
    [SCIENCE_BUTTON_TYPES.IRON_SMELTING]: 'Iron Smelting',
    [SCIENCE_BUTTON_TYPES.STEELMAKING]: 'Steelmaking',
}

export const SCIENCE_BUTTON_PREREQS: IPrereqsList = {
    [SCIENCE_BUTTON_TYPES.WOODEN_AXE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.IRON_AXE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.STEEL_AXE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.WOODEN_HOE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.IRON_HOE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.STEEL_HOE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.LIBRARY]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.ORE_MINING]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.IRON_SMELTING]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.STEELMAKING]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
}