import { OTHER_BUTTON_TYPES } from './buttons/otherButtons';
import { EMPIRE_BUTTON_TYPES } from './buttons/empireButtons'
import type { IInfoBoxList } from "~/interfaces/infoBox"
import { MILITARY_BUTTON_TYPES } from './buttons/militaryButtons';
import { SCIENCE_BUTTON_TYPES } from './buttons/scienceButtons';
import { GATHER_FOOD_AMOUNT, GATHER_WOOD_AMOUNT, BONUSES, CAPACITIES, MANSION_COAL_CONSUMPTION, TAVERN_FOOD_CONSUMPTION } from './gameState';
import { SPECIAL_ABILITIES } from './military/specialAbilities';

export const EMPIRE_INFO_BOXES: IInfoBoxList = {
    [EMPIRE_BUTTON_TYPES.GATHER_FOOD]: {
        title: 'Gather Food',
        text: `Collect ${GATHER_FOOD_AMOUNT} food`
    },
    [EMPIRE_BUTTON_TYPES.CREATE_FARM]: {
        title: 'Create Farm',
        text: 'Generates 1 food per second'
    },
    [EMPIRE_BUTTON_TYPES.GATHER_WOOD]: {
        title: 'Create Farm',
        text: `Collect ${GATHER_WOOD_AMOUNT} wood`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_STORAGE]: {
        title: 'Build Storage',
        text: `Increase resource limit by ${CAPACITIES.STORAGE} per storage`
    },
    [EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM]: {
        title: 'Create Tree Farm',
        text: 'Generates 2 wood per second'
    },
    [EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE]: {
        title: 'Build Attractive House',
        text: 'Build a very attractive house capable of captivating the gaze and admiration of passersby'
    },
    [EMPIRE_BUTTON_TYPES.BUILD_HOUSE]: {
        title: 'Build House',
        text: `Increases max workers by ${BONUSES.HOUSE}`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_MANSION]: {
        title: 'Build Mansion',
        text: `Increases max workers by ${BONUSES.MANSION} and consumes ${MANSION_COAL_CONSUMPTION} coal per second`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_TAVERN]: {
        title: 'Build Tavern',
        text: `Increases worker efficiency by ${BONUSES.TAVERN}% per tavern and consumes ${TAVERN_FOOD_CONSUMPTION} food per second`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_ATHENAEUM]: {
        title: 'Build Athenaeum',
        text: `Unlocks the science tab`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE]: {
        title: 'Build Warehouse',
        text: `Increases resource limit by ${CAPACITIES.WAREHOUSE} per warehouse`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_GRANARY]: {
        title: 'Build Granary',
        text: `Increases food storage limit by ${CAPACITIES.GRANARY} and acquisition by ${BONUSES.GRANARY * 100}% per granary`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_SAWMILL]: {
        title: 'Build Sawmill',
        text: `Increase wood storage limit by ${CAPACITIES.SAWMILL} and acquisition by ${BONUSES.SAWMILL * 100}% per sawmill`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_QUARRY]: {
        title: 'Build Quarry',
        text: `Increase raw ore, coal, and gold storage limit by ${CAPACITIES.QUARRY} and acquisition by ${BONUSES.QUARRY * 100}% per quarry`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_UNIVERSITY]: {
        title: 'Build University',
        text: `Increase knowledge storage limit by ${CAPACITIES.UNIVERSITY} and acquisition by ${BONUSES.UNIVERSITY * 100}% per university`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_HUGE_WAREHOUSE]: {
        title: 'Build Huge Warehouse',
        text: `Increases resource limit by ${CAPACITIES.HUGE_WAREHOUSE} per huge warehouse`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_WORKSHOP]: {
        title: 'Build Workshop',
        text: `Converts wood into wood planks`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_IRON_SMELTER]: {
        title: 'Build Iron Smelter',
        text: `Smelts raw ore into iron`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE]: {
        title: 'Build Blast Furnace',
        text: `Purifies iron into steel`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_MITHRIL_FURNACE]: {
        title: 'Build Mith Furnace',
        text: `Forges a powerful alloy by combining steel and raw mithril ore`
    },
    [EMPIRE_BUTTON_TYPES.BUILD_MAGIC_FURNACE]: {
        title: 'Build Magic Furnace',
        text: `Uses magic to forcibly combine mithril alloy with raw adamantite ore`
    },
}

export const SCIENCE_INFO_BOXES: IInfoBoxList = {
    [SCIENCE_BUTTON_TYPES.MATHEMATICS]: {
        title: 'Mathematics',
        text: 'Unlocks more advanced technology',
    },
    [SCIENCE_BUTTON_TYPES.CRANE]: {
        title: 'Treadmill Crane',
        text: 'Unlocks more advanced buildings',
    },
    [SCIENCE_BUTTON_TYPES.INDUSTRY]: {
        title: 'Industry',
        text: 'Unlocks advanced material generation',
    },
    [SCIENCE_BUTTON_TYPES.ADVANCED_INDUSTRY]: {
        title: 'Advanced Industry',
        text: 'Unlocks even more advanced material generation',
    },
    [SCIENCE_BUTTON_TYPES.LAWS_OF_NATURE]: {
        title: 'Laws of Nature',
        text: 'Unlocks more advanced technology',
    },
    // [SCIENCE_BUTTON_TYPES.ART_OF_WAR]: {
    //     title: 'Art of War',
    //     text: 'Unlocks unit upgrades in the barracks',
    // },
    [SCIENCE_BUTTON_TYPES.TAXATION]: {
        title: 'Taxation',
        text: 'Each worker generates 0.5 gold per second',
    },
    [SCIENCE_BUTTON_TYPES.CONSCRIPTION]: {
        title: 'Conscription',
        text: 'Unlocks unit training in the barracks',
    },
    // [SCIENCE_BUTTON_TYPES.STANDING_ARMY]: {
    //     title: 'Standing Army',
    //     text: 'Increases unit limit by 1',
    // },
    [SCIENCE_BUTTON_TYPES.BLOCK_PRINTING]: {
        title: 'Block Printing',
        text: 'Increases knowledge acquisition speed by 50%',
    },
    [SCIENCE_BUTTON_TYPES.DOUBLE_BIT_AXE]: {
        title: 'Double-Bit Axe',
        text: 'Increases woodcutting speed by 50%',
    },
    [SCIENCE_BUTTON_TYPES.BOW_SAW]: {
        title: 'Bow Saw',
        text: 'Increases woodcutting speed by 50% (stacks with previous upgrades)',
    },
    [SCIENCE_BUTTON_TYPES.TWO_MAN_SAW]: {
        title: 'Two-Man Saw',
        text: 'Increases woodcutting speed by 50% (stacks with previous upgrades)',
    },
    [SCIENCE_BUTTON_TYPES.HORSE_COLLAR]: {
        title: 'Horse Collar',
        text: 'Increases farming speed by 50%',
    },
    [SCIENCE_BUTTON_TYPES.HEAVY_PLOW]: {
        title: 'Heavy Plow',
        text: 'Increases farming speed by 50% (stacks with previous upgrades)',
    },
    [SCIENCE_BUTTON_TYPES.CROP_ROTATION]: {
        title: 'Crop Rotation',
        text: 'Increases farming speed by 50% (stacks with previous upgrades)',
    },
    [SCIENCE_BUTTON_TYPES.WOODEN_PICKAXE]: {
        title: 'Wooden Pickaxe',
        text: 'Increases mining speed by 50%',
    },
    [SCIENCE_BUTTON_TYPES.IRON_PICKAXE]: {
        title: 'Iron Pickaxe',
        text: 'Increases mining speed by 50% (stacks with previous upgrades)',
    },
    [SCIENCE_BUTTON_TYPES.SHAFT_MINING]: {
        title: 'Shaft Mining',
        text: 'Increases mining speed by 50% (stacks with previous upgrades)',
    },
    [SCIENCE_BUTTON_TYPES.MITHRIL_PICKAXE]: {
        title: 'Mithril Pickaxe',
        text: 'Increases mining speed by 50% (stacks with previous upgrades)',
    },
    [SCIENCE_BUTTON_TYPES.ADAMANTITE_PICKAXE]: {
        title: 'Adamantite Pickaxe',
        text: 'Increases mining speed by 50% (stacks with previous upgrades)',
    },
    [SCIENCE_BUTTON_TYPES.ORE_MINING]: {
        title: 'Ore Mining',
        text: 'Unlocks ore mining',
    },
    [SCIENCE_BUTTON_TYPES.IRON_SMELTING]: {
        title: 'Iron Smelting',
        text: 'Unlocks iron processing',
    },
    [SCIENCE_BUTTON_TYPES.HUNTERS]: {
        title: 'Hunters',
        text: 'Allows workers to hunt for fur',
    },
    [SCIENCE_BUTTON_TYPES.STEELMAKING]: {
        title: 'Steelmaking',
        text: 'Unlocks steel',
    },
    [SCIENCE_BUTTON_TYPES.STEEL_FRAMING]: {
        title: 'Steel Framing',
        text: 'Unlocks more advanced buildings',
    },
    [SCIENCE_BUTTON_TYPES.BARRACKS]: {
        title: 'Barracks',
        text: 'Unlocks the barracks and expedition tab',
    },
    [SCIENCE_BUTTON_TYPES.SLINGSHOTS]: {
        title: 'Slingshots',
        text: 'Unlocks the footpad unit line',
    },
    [SCIENCE_BUTTON_TYPES.HEAVY_INFANTRY]: {
        title: 'Heavy Infantry',
        text: 'Unlocks the heavy infantry unit line',
    },
    [SCIENCE_BUTTON_TYPES.MAGIC]: {
        title: 'Magic',
        text: 'Unlocks the mage unit line',
    },
    [SCIENCE_BUTTON_TYPES.MITHRIL]: {
        title: 'Mithril',
        text: 'Unlocks mithril',
    },
    [SCIENCE_BUTTON_TYPES.ADAMANTITE]: {
        title: 'Adamantite',
        text: 'Unlocks adamantite',
    },
    [SCIENCE_BUTTON_TYPES.STUDY_SINATRA_ARTIFACT]: {
        title: 'Study Artifact',
        text: 'Unlocks the heavy infantry unit upgrade',
    },
    [SCIENCE_BUTTON_TYPES.STUDY_ADUN_ARTIFACT]: {
        title: 'Study Artifact',
        text: 'Unlocks the pikeman unit upgrade',
    },
    [SCIENCE_BUTTON_TYPES.STUDY_AEDUS_TOME_ARTIFACT]: {
        title: 'Study Artifact',
        text: 'Unlocks the mage unit upgrade',
    },
    [SCIENCE_BUTTON_TYPES.STUDY_LUTAREZ_ARTIFACT]: {
        title: 'Study Artifact',
        text: 'Unlocks the shocktrooper unit upgrade',
    },
    [SCIENCE_BUTTON_TYPES.DWARVERN_ENGINEERING]: {
        title: 'Dwarvern Engineering',
        text: 'Unlocks more advanced technology',
    },
    [SCIENCE_BUTTON_TYPES.THUNDERSTICKS]: {
        title: 'Thunderstick',
        text: 'Unlocks the thunderer unit',
    },

}

export const MILITARY_INFO_BOXES: IInfoBoxList = {
    [MILITARY_BUTTON_TYPES.TRAIN_SPEARMAN]: {
        title: 'Train Spearman',
        text: 'Increases spearman count by one'
    },
    [MILITARY_BUTTON_TYPES.UPGRADE_SPEARMAN]: {
        title: 'Upgrade Spearman',
        text: 'Upgrades all spearmen'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_PIKEMAN]: {
        title: 'Train Pikeman',
        text: 'Increases pikeman count by one'
    },
    [MILITARY_BUTTON_TYPES.UPGRADE_PIKEMAN]: {
        title: 'Upgrade Pikeman',
        text: 'Upgrades all pikemen'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_HALBERDIER]: {
        title: 'Train Halberdier',
        text: 'Increases halberdier count by one'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_FOOTPAD]: {
        title: 'Train Footpad',
        text: 'Increases footpad count by one'
    },
    [MILITARY_BUTTON_TYPES.UPGRADE_FOOTPAD]: {
        title: 'Upgrade Footpad',
        text: 'Upgrades all footpads'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_OUTLAW]: {
        title: 'Train Outlaw',
        text: 'Increases outlaw count by one'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_HEAVY_INFANTRY]: {
        title: 'Train Heavy Infantry',
        text: 'Increases heavy infantry count by one'
    },
    [MILITARY_BUTTON_TYPES.UPGRADE_HEAVY_INFANTRY]: {
        title: 'Upgrade Heavy Infantry',
        text: 'Upgrades all heavy infantries'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_SHOCKTROOPER]: {
        title: 'Train Shocktrooper',
        text: 'Increases shocktrooper count by one'
    },
    [MILITARY_BUTTON_TYPES.UPGRADE_SHOCKTROOPER]: {
        title: 'Upgrade Shocktrooper',
        text: 'Upgrades all shocktroopers'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_SIEGETROOPER]: {
        title: 'Train Siegetrooper',
        text: 'Increases siegetrooper count by one'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_MAGE]: {
        title: 'Train Mage',
        text: 'Increases mage count by one'
    },
    [MILITARY_BUTTON_TYPES.UPGRADE_MAGE]: {
        title: 'Upgrade Mage',
        text: 'Upgrades all mages'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_ARCH_MAGE]: {
        title: 'Train Arch Mage',
        text: 'Increases arch mage count by one'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_THUNDERER]: {
        title: 'Train Thunderer',
        text: 'Increases thunderer count by one'
    },
    [MILITARY_BUTTON_TYPES.UPGRADE_THUNDERER]: {
        title: 'Upgrade Thunderer',
        text: 'Upgrades thunderers mages'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_THUNDERGUARD]: {
        title: 'Train Thunderguard',
        text: 'Increases thunderguard count by one'
    },
    [MILITARY_BUTTON_TYPES.UPGRADE_THUNDERGUARD]: {
        title: 'Upgrade Thunderguard',
        text: 'Upgrades all thunderguards'
    },
    [MILITARY_BUTTON_TYPES.TRAIN_DRAGONGUARD]: {
        title: 'Train Dragonguard',
        text: 'Increases dragonguard count by one'
    },
}

export const ABILITY_INFO_BOXES: Record<string, string> = {
    [SPECIAL_ABILITIES.RANGED]: 'Ranged: Can attack from a distance',
    [SPECIAL_ABILITIES.ETHEREAL]: 'Ethereal: Can move off of the main path',
    [SPECIAL_ABILITIES.AOE]: 'AOE: Deals damage to all units in the target cell',
    [SPECIAL_ABILITIES.GLOBAL_POISON]: 'Global poison: Every allied unit takes poison damage'
}

export const OTHER_INFO_BOXES: IInfoBoxList = {
    [OTHER_BUTTON_TYPES.LORD_1]: {
        title: 'The Final Bastion of Humanity',
        text: 'Become the lord of hope. You will lead humanity to heights never seen before, your name remembered for centuries to come. Your subjects will be comprised of the wisest of scholars and the most legendary of knights.'
    },
    [OTHER_BUTTON_TYPES.LORD_2]: {
        title: 'Destroyer of All',
        text: `Don't worry, you're not actually going to destroy everything. However, your power will become so great that one could mistake you as a bringer of apocalypse. Be warned, however, as humans aren't capable of such power, nor will humans want to follow you...`
    },
}

export const INFO_BOX_TYPES: Record<string, string> = {
    RESOURCE: 'resource',
    ABILITY: 'ability',
}