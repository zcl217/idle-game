import type { ICoordinates } from "~/interfaces/common"
import { cellHeight, cellWidth } from "./maps"

export const spriteSizes = {
    "TYPE_1": {
        x: cellWidth,
        y: cellHeight
    },
    "TYPE_2": {
        x: 168,
        y: 104
    }
}

export const unitStates = {
    IDLE: "idle",
    ATTACK: "attack",
    MOVE: "move",
}

export const spriteType = {
    PLAYER: 'player',
    ENEMY: 'enemy',
}