
import type { IButtonCostList } from '~/interfaces/buttons';
import type { IPrereqsList } from '~/interfaces/common';
import { RESOURCE_TYPES } from '../resources/resourceTypes';

export const SCIENCE_BUTTON_TYPES = {
    MATHEMATICS: 'mathematics',
    DOUBLE_BIT_AXE: 'doubleBitAxe',
    ORE_MINING: 'oreMining',
    HORSE_COLLAR: 'horseCollar',
    BLOCK_PRINTING: 'blockPrinting',
    BOW_SAW: 'bowSaw',
    TWO_MAN_SAW: 'twoManSaw',
    HEAVY_PLOW: 'heavyPlow',
    CROP_ROTATION: 'cropRotation',
    WOODEN_PICKAXE: 'woodenPickaxe',
    IRON_PICKAXE: 'ironPickaxe',
    SHAFT_MINING: 'shaftMining',
    CRANE: 'crane',
    INDUSTRY: 'industry',
    ADVANCED_INDUSTRY: 'advancedIndustry',
    LAWS_OF_NATURE: 'lawsOfNature',
    ART_OF_WAR: 'artOfWar',
    CONSCRIPTION: 'conscription',
    IRON_SMELTING: 'ironSmelting',
    STEELMAKING: 'steelMaking',
    BARRACKS: 'barracks',
    SLINGSHOTS: 'slingshots',
    HEAVY_INFANTRY: 'heavyInfantry',
    MAGIC: 'magic',
    STANDING_ARMY: 'standingArmy',
}

export const SCIENCE_BUTTON_TEXTS = {
    [SCIENCE_BUTTON_TYPES.MATHEMATICS]: 'Mathematics',
    [SCIENCE_BUTTON_TYPES.CRANE]: 'Treadmill Crane',
    [SCIENCE_BUTTON_TYPES.INDUSTRY]: 'Industry',
    [SCIENCE_BUTTON_TYPES.ADVANCED_INDUSTRY]: 'Advanced Industry',
    [SCIENCE_BUTTON_TYPES.LAWS_OF_NATURE]: 'Laws of Nature',
    [SCIENCE_BUTTON_TYPES.ART_OF_WAR]: 'Art of War',
    [SCIENCE_BUTTON_TYPES.CONSCRIPTION]: 'Conscription',
    [SCIENCE_BUTTON_TYPES.BLOCK_PRINTING]: 'Block Printing',
    [SCIENCE_BUTTON_TYPES.DOUBLE_BIT_AXE]: 'Double-Bit Axe',
    [SCIENCE_BUTTON_TYPES.BOW_SAW]: 'Bow Saw',
    [SCIENCE_BUTTON_TYPES.TWO_MAN_SAW]: 'Two-Man Saw',
    [SCIENCE_BUTTON_TYPES.HORSE_COLLAR]: 'Horse Collar',
    [SCIENCE_BUTTON_TYPES.HEAVY_PLOW]: 'Heavy Plow',
    [SCIENCE_BUTTON_TYPES.CROP_ROTATION]: 'Crop Rotation',
    [SCIENCE_BUTTON_TYPES.WOODEN_PICKAXE]: 'Wooden Pickaxe',
    [SCIENCE_BUTTON_TYPES.IRON_PICKAXE]: 'Iron Pickaxe',
    [SCIENCE_BUTTON_TYPES.SHAFT_MINING]: 'Shaft Mining',
    [SCIENCE_BUTTON_TYPES.ORE_MINING]: 'Ore Mining',
    [SCIENCE_BUTTON_TYPES.IRON_SMELTING]: 'Iron Smelting',
    [SCIENCE_BUTTON_TYPES.STEELMAKING]: 'Steelmaking',
    [SCIENCE_BUTTON_TYPES.BARRACKS]: 'Barracks',
    [SCIENCE_BUTTON_TYPES.SLINGSHOTS]: 'Slingshots',
    [SCIENCE_BUTTON_TYPES.HEAVY_INFANTRY]: 'Heavy Infantry',
    [SCIENCE_BUTTON_TYPES.MAGIC]: 'Magic',
    [SCIENCE_BUTTON_TYPES.STANDING_ARMY]: 'Standing Army',
}

export const SCIENCE_BUTTON_PREREQS: IPrereqsList = {
    [SCIENCE_BUTTON_TYPES.DOUBLE_BIT_AXE]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.HORSE_COLLAR]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.ORE_MINING]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.MATHEMATICS]: {
        sciencePrereqs: [],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.CRANE]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.MATHEMATICS],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.INDUSTRY]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.CRANE],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.BOW_SAW]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.MATHEMATICS, SCIENCE_BUTTON_TYPES.DOUBLE_BIT_AXE, SCIENCE_BUTTON_TYPES.IRON_SMELTING],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.TWO_MAN_SAW]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.BOW_SAW, SCIENCE_BUTTON_TYPES.STEELMAKING],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.HEAVY_PLOW]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.MATHEMATICS, SCIENCE_BUTTON_TYPES.HORSE_COLLAR, SCIENCE_BUTTON_TYPES.IRON_SMELTING],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.CROP_ROTATION]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.HEAVY_PLOW, SCIENCE_BUTTON_TYPES.STEELMAKING],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.WOODEN_PICKAXE]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.ORE_MINING],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.IRON_PICKAXE]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.MATHEMATICS, SCIENCE_BUTTON_TYPES.WOODEN_PICKAXE, SCIENCE_BUTTON_TYPES.IRON_SMELTING],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.SHAFT_MINING]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.IRON_PICKAXE, SCIENCE_BUTTON_TYPES.STEELMAKING],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.BLOCK_PRINTING]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.MATHEMATICS, SCIENCE_BUTTON_TYPES.ORE_MINING],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.ADVANCED_INDUSTRY]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.INDUSTRY],
        resourcePrereqs: [RESOURCE_TYPES.GEM_OF_ETHEREALITY]
    },
    [SCIENCE_BUTTON_TYPES.IRON_SMELTING]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.ORE_MINING, SCIENCE_BUTTON_TYPES.INDUSTRY],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.BARRACKS]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.IRON_SMELTING],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.SLINGSHOTS]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.BARRACKS],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.HEAVY_INFANTRY]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.BARRACKS, SCIENCE_BUTTON_TYPES.STEELMAKING],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.CONSCRIPTION]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.MATHEMATICS, SCIENCE_BUTTON_TYPES.BARRACKS],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.STANDING_ARMY]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.CONSCRIPTION],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.LAWS_OF_NATURE]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.CRANE, SCIENCE_BUTTON_TYPES.IRON_SMELTING, SCIENCE_BUTTON_TYPES.BARRACKS],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.MAGIC]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.BARRACKS, SCIENCE_BUTTON_TYPES.LAWS_OF_NATURE],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.STEELMAKING]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.LAWS_OF_NATURE, SCIENCE_BUTTON_TYPES.IRON_SMELTING],
        resourcePrereqs: []
    },
    [SCIENCE_BUTTON_TYPES.ART_OF_WAR]: {
        sciencePrereqs: [SCIENCE_BUTTON_TYPES.STEELMAKING],
        resourcePrereqs: []
    },
}

export const SCIENCE_BUTTON_COSTS: IButtonCostList = {
    [SCIENCE_BUTTON_TYPES.MATHEMATICS]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 200 }
    ],
    [SCIENCE_BUTTON_TYPES.DOUBLE_BIT_AXE]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 300 },
        { type: RESOURCE_TYPES.WOOD, cost: 500 }
    ],
    [SCIENCE_BUTTON_TYPES.BOW_SAW]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 5000 },
        { type: RESOURCE_TYPES.IRON, cost: 150 }
    ],
    [SCIENCE_BUTTON_TYPES.TWO_MAN_SAW]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 25000 },
        { type: RESOURCE_TYPES.WOOD_PLANK, cost: 300 },
        { type: RESOURCE_TYPES.STEEL, cost: 200 }
    ],
    [SCIENCE_BUTTON_TYPES.HORSE_COLLAR]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 300 },
        { type: RESOURCE_TYPES.WOOD, cost: 500 }
    ],
    [SCIENCE_BUTTON_TYPES.HEAVY_PLOW]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 5000 },
        { type: RESOURCE_TYPES.IRON, cost: 150 }
    ],
    [SCIENCE_BUTTON_TYPES.CROP_ROTATION]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 25000 },
        { type: RESOURCE_TYPES.STEEL, cost: 300 }
    ],
    [SCIENCE_BUTTON_TYPES.WOODEN_PICKAXE]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 300 },
        { type: RESOURCE_TYPES.WOOD, cost: 500 }
    ],
    [SCIENCE_BUTTON_TYPES.IRON_PICKAXE]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 5000 },
        { type: RESOURCE_TYPES.IRON, cost: 150 }
    ],
    [SCIENCE_BUTTON_TYPES.SHAFT_MINING]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 30000 },
        { type: RESOURCE_TYPES.IRON, cost: 200 },
        { type: RESOURCE_TYPES.STEEL, cost: 200 }
    ],
    [SCIENCE_BUTTON_TYPES.ORE_MINING]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 1000 }
    ],
    [SCIENCE_BUTTON_TYPES.CRANE]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 2000 },
        { type: RESOURCE_TYPES.WOOD, cost: 1000 }
    ],
    [SCIENCE_BUTTON_TYPES.INDUSTRY]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 5000 },
        { type: RESOURCE_TYPES.WOOD, cost: 1000 }
    ],
    [SCIENCE_BUTTON_TYPES.ADVANCED_INDUSTRY]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 30000 },
        { type: RESOURCE_TYPES.WOOD_PLANK, cost: 1000 },
        { type: RESOURCE_TYPES.STEEL, cost: 500 },
        { type: RESOURCE_TYPES.GEM_OF_ETHEREALITY, cost: 1 },
    ],
    [SCIENCE_BUTTON_TYPES.LAWS_OF_NATURE]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 10000 }
    ],
    [SCIENCE_BUTTON_TYPES.ART_OF_WAR]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 1500 },
        { type: RESOURCE_TYPES.FOOD, cost: 1000 },
        { type: RESOURCE_TYPES.IRON, cost: 50 },
        { type: RESOURCE_TYPES.GOLD, cost: 50 }
    ],
    [SCIENCE_BUTTON_TYPES.CONSCRIPTION]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 500 },
        { type: RESOURCE_TYPES.GOLD, cost: 50 }
    ],
    [SCIENCE_BUTTON_TYPES.BLOCK_PRINTING]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 7000 },
        { type: RESOURCE_TYPES.WOOD, cost: 3000 },
        { type: RESOURCE_TYPES.WOOD_PLANK, cost: 20 },
        { type: RESOURCE_TYPES.GOLD, cost: 50 },
    ],
    [SCIENCE_BUTTON_TYPES.IRON_SMELTING]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 500 }
    ],
    [SCIENCE_BUTTON_TYPES.STEELMAKING]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 2000 }
    ],
    [SCIENCE_BUTTON_TYPES.BARRACKS]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 500 }
    ],
    [SCIENCE_BUTTON_TYPES.SLINGSHOTS]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 700 },
        { type: RESOURCE_TYPES.RAW_ORE, cost: 300 },
        { type: RESOURCE_TYPES.WOOD, cost: 300 }
    ],
    [SCIENCE_BUTTON_TYPES.HEAVY_INFANTRY]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 12000 },
        { type: RESOURCE_TYPES.STEEL, cost: 10 }
    ],
    [SCIENCE_BUTTON_TYPES.MAGIC]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 12000 }
    ],
    [SCIENCE_BUTTON_TYPES.STANDING_ARMY]: [
        { type: RESOURCE_TYPES.KNOWLEDGE, cost: 20000 },
        { type: RESOURCE_TYPES.GOLD, cost: 700 },
    ],
    // [EMPIRE_BUTTON_TYPES.CREATE_FARM]: [
    //     {
    //         type: [RESOURCE_TYPES.FOOD],
    //        
    //         cost: 10,
    //     },
    //     {
    //         text:
    //     }
    // ],

}