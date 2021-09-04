import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";

export const WOLF2_SPRITESHEET_INFO: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spritesheets/enemies/wolf2.png",
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