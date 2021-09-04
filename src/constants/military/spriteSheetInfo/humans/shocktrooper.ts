import type { ISpriteSheetInfo } from "~/interfaces/military/sprite";

export const SHOCKTROOPER_SPRITESHEET_INFO: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spritesheets/humans/shocktrooper.png",
    idleFrames: [
        { row: 0, col: 0 },
    ],
    attackFrames: [
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 0 },
    ],
}