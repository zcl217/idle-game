
import { uniqueId } from 'lodash'
import type { IPrereqsList } from '~/interfaces/common';

export const scienceButtonTypes = {
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

export const scienceButtonTexts = {
    [scienceButtonTypes.WOODEN_AXE]: 'Wooden Axe',
    [scienceButtonTypes.IRON_AXE]: 'Iron Axe',
    [scienceButtonTypes.STEEL_AXE]: 'Steel Axe',
    [scienceButtonTypes.WOODEN_HOE]: 'Wooden Hoe',
    [scienceButtonTypes.IRON_HOE]: 'Iron Hoe',
    [scienceButtonTypes.STEEL_HOE]: 'Steel Hoe',
    [scienceButtonTypes.LIBRARY]: 'Library',
    [scienceButtonTypes.ORE_MINING]: 'Ore Mining',
    [scienceButtonTypes.IRON_SMELTING]: 'Iron Smelting',
    [scienceButtonTypes.STEELMAKING]: 'Steelmaking',
}

export const scienceButtonPrereqs: IPrereqsList = {
    [scienceButtonTypes.WOODEN_AXE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [scienceButtonTypes.IRON_AXE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [scienceButtonTypes.STEEL_AXE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [scienceButtonTypes.WOODEN_HOE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [scienceButtonTypes.IRON_HOE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [scienceButtonTypes.STEEL_HOE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [scienceButtonTypes.LIBRARY]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [scienceButtonTypes.ORE_MINING]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [scienceButtonTypes.IRON_SMELTING]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [scienceButtonTypes.STEELMAKING]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
}