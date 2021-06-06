import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";

export const PIKEMAN_SPRITESHEET_INFO: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spriteSheets/humans/pikeman.png",
    idleFrames: [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 0, col: 2 },
        { row: 1, col: 1 },
        { row: 1, col: 0 },
    ],
    attackFrames: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
    ],
}