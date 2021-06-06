import type { ISpriteSheetInfo } from "~/interfaces/military/sprite"

export const MAGE_SPRITESHEET_INFO: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spriteSheets/humans/mage.png",
    idleFrames: [
        { row: 0, col: 0 },
    ],
    attackFrames: [
        { row: 0, col: 0, },
        { row: 0, col: 1, },
        { row: 0, col: 2, },
        { row: 0, col: 1, },
    ],
}