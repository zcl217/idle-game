import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";

export const wolf2SpriteSheetInfo: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spriteSheets/enemies/wolf2.png",
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