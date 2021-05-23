import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";
import { heavyInfantrySpriteSheetInfo } from "./spriteSheetInfo/humans/heavyInfantry";
import { mageSpriteSheetInfo } from "./spriteSheetInfo/humans/mage";
import { wolf1SpriteSheetInfo } from "./spriteSheetInfo/monsters/wolf1";
import { wolf2SpriteSheetInfo } from "./spriteSheetInfo/monsters/wolf2";
import { wolf3SpriteSheetInfo } from "./spriteSheetInfo/monsters/wolf3";
import { unitType } from "./units/unitTypes";

export const spriteSheetMap: Record<string, ISpriteSheetInfo> = {
    [unitType.HEAVY_INFANTRY]: heavyInfantrySpriteSheetInfo,
    [unitType.MAGE]: mageSpriteSheetInfo,
    [unitType.WOLF1]: wolf1SpriteSheetInfo,
    [unitType.WOLF2]: wolf2SpriteSheetInfo,
    [unitType.WOLF3]: wolf3SpriteSheetInfo,
}
