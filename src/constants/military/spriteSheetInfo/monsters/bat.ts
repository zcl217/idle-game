import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";

export const BAT_SPRITESHEET_INFO: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spriteSheets/enemies/bat.png",
    idleFrames: [
        { row: 0, col: 0 },
    ],
    moveFrames: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
    ],
    attackFrames: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
    ],
}