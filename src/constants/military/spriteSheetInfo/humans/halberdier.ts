import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";

export const HALBERDIER_SPRITESHEET_INFO: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spriteSheets/humans/halberdier.png",
    idleFrames: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 0, col: 3 },
        { row: 1, col: 3 },
        { row: 2, col: 3 },
        { row: 3, col: 0 },
        { row: 2, col: 2 },
        { row: 2, col: 1 },
        { row: 2, col: 0 },
        { row: 1, col: 2 },
        { row: 1, col: 1 },
        { row: 1, col: 0 },
        { row: 0, col: 2 },
        { row: 0, col: 1 },
    ],
    attackFrames: [
        { row: 3, col: 1 },
        { row: 3, col: 2 },
    ],
}