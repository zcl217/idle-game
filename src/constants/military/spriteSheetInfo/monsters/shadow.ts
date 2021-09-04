import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";

export const SHADOW_SPRITESHEET_INFO: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spritesheets/enemies/shadow.png",
    idleFrames: [
        { row: 0, col: 0 },
    ],
    moveFrames: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
    ],
    attackFrames: [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
    ],
}