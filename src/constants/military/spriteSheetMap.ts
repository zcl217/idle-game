import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";
import { ARCH_MAGE_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/archMage";
import { FOOTPAD_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/footpad";
import { HALBERDIER_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/halberdier";
import { HEAVY_INFANTRY_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/heavyInfantry";
import { MAGE_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/mage";
import { OUTLAW_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/outlaw";
import { PIKEMAN_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/pikeman";
import { SHOCKTROOPER_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/shocktrooper";
import { SIEGETROOPER_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/siegetrooper";
import { SPEARMAN_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/spearman";
import { BAT_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/bat";
import { GHAST_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/ghast";
import { GHOST_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/ghost";
import { SHADOW_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/shadow";
import { SKELETON_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/skeleton";
import { SKELETON_ARCHER_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/skeletonArcher";
import { WOLF1_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/wolf1";
import { WOLF2_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/wolf2";
import { WOLF3_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/wolf3";
import { UNIT_TYPES } from "./units/unitTypes";

export const SPRITESHEET_MAP: Record<string, ISpriteSheetInfo> = {
    [UNIT_TYPES.SPEARMAN]: SPEARMAN_SPRITESHEET_INFO,
    [UNIT_TYPES.PIKEMAN]: PIKEMAN_SPRITESHEET_INFO,
    [UNIT_TYPES.HALBERDIER]: HALBERDIER_SPRITESHEET_INFO,
    [UNIT_TYPES.FOOTPAD]: FOOTPAD_SPRITESHEET_INFO,
    [UNIT_TYPES.OUTLAW]: OUTLAW_SPRITESHEET_INFO,
    [UNIT_TYPES.HEAVY_INFANTRY]: HEAVY_INFANTRY_SPRITESHEET_INFO,
    [UNIT_TYPES.SIEGETROOPER]: SIEGETROOPER_SPRITESHEET_INFO,
    [UNIT_TYPES.SHOCKTROOPER]: SHOCKTROOPER_SPRITESHEET_INFO,
    [UNIT_TYPES.MAGE]: MAGE_SPRITESHEET_INFO,
    [UNIT_TYPES.ARCH_MAGE]: ARCH_MAGE_SPRITESHEET_INFO,
    [UNIT_TYPES.WOLF1]: WOLF1_SPRITESHEET_INFO,
    [UNIT_TYPES.WOLF2]: WOLF2_SPRITESHEET_INFO,
    [UNIT_TYPES.WOLF3]: WOLF3_SPRITESHEET_INFO,
    [UNIT_TYPES.SKELETON]: SKELETON_SPRITESHEET_INFO,
    [UNIT_TYPES.SKELETON_ARCHER]: SKELETON_ARCHER_SPRITESHEET_INFO,
    [UNIT_TYPES.BAT]: BAT_SPRITESHEET_INFO,
    [UNIT_TYPES.GHOST]: GHOST_SPRITESHEET_INFO,
    [UNIT_TYPES.SHADOW]: SHADOW_SPRITESHEET_INFO,
    [UNIT_TYPES.GHAST]: GHAST_SPRITESHEET_INFO,
}
