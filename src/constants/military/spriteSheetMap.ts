import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";
import { HEAVY_INFANTRY_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/heavyInfantry";
import { MAGE_SPRITESHEET_INFO } from "./spriteSheetInfo/humans/mage";
import { WOLF1_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/wolf1";
import { WOLF2_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/wolf2";
import { WOLF3_SPRITESHEET_INFO } from "./spriteSheetInfo/monsters/wolf3";
import { UNIT_TYPES } from "./units/unitTypes";

export const SPRITESHEET_MAP: Record<string, ISpriteSheetInfo> = {
    [UNIT_TYPES.HEAVY_INFANTRY]: HEAVY_INFANTRY_SPRITESHEET_INFO,
    [UNIT_TYPES.MAGE]: MAGE_SPRITESHEET_INFO,
    [UNIT_TYPES.WOLF1]: WOLF1_SPRITESHEET_INFO,
    [UNIT_TYPES.WOLF2]: WOLF2_SPRITESHEET_INFO,
    [UNIT_TYPES.WOLF3]: WOLF3_SPRITESHEET_INFO,
}
