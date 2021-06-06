import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";

export const GHOST_SPRITESHEET_INFO: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spriteSheets/enemies/ghost.png",
    idleFrames: [
        { row: 0, col: 0 },
    ],
    moveFrames: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
    ],
    attackFrames: [
        { row: 1, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 0, col: 2 },
    ],
}