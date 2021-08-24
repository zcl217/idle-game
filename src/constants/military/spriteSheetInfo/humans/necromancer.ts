import type { ISpriteSheetInfo } from "~/interfaces/military/sprite"

export const MAGE_SPRITESHEET_INFO: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spriteSheets/humans/necromancer.png",
    idleFrames: [
        { row: 0, col: 0 },
    ],
    attackFrames: [
        { row: 0, col: 1, },
        { row: 1, col: 0, },
        { row: 1, col: 1, },
        { row: 1, col: 0, },
    ],
}