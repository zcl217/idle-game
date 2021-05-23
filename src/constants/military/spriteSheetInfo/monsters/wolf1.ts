import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";

export const wolf1SpriteSheetInfo: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spriteSheets/enemies/wolf1.png",
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