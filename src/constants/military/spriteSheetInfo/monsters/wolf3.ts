import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";

export const WOLF3_SPRITESHEET_INFO: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spriteSheets/enemies/wolf3.png",
    idleFrames: [
        {
            row: 0,
            col: 0
        },
    ],
    moveFrames: [
        {
            row: 0,
            col: 0
        },
        {
            row: 0,
            col: 1,
        },
    ],
    attackFrames: [
        {
            row: 0,
            col: 0
        },
        {
            row: 0,
            col: 2,
        },
    ],
}