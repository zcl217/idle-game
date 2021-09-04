import type { ISpriteSheetInfo } from "~/interfaces/military/sprite"

export const SPEARMAN_SPRITESHEET_INFO: ISpriteSheetInfo = {
    spriteSheet: "~/../sprites/spritesheets/humans/spearman.png",
    idleFrames: [
        {
            row: 3,
            col: 0
        },
        {
            row: 3,
            col: 1
        },
        {
            row: 3,
            col: 2
        },
        {
            row: 3,
            col: 3
        },
        {
            row: 0,
            col: 4
        },
        {
            row: 1,
            col: 4
        },
    ],
    attackFrames: [
        {
            row: 0,
            col: 0,
        },
        {
            row: 0,
            col: 1,
        },
        {
            row: 0,
            col: 2,
        },
        {
            row: 0,
            col: 3,
        },
        {
            row: 1,
            col: 0,
        },
        {
            row: 1,
            col: 1,
        },
        {
            row: 1,
            col: 2,
        },
        {
            row: 1,
            col: 3,
        }, 
        {
            row: 2,
            col: 0,
        },
        {
            row: 2,
            col: 1,
        },
        {
            row: 2,
            col: 2,
        },
        {
            row: 2,
            col: 3,
        },
    ],
}