import type { ICoordinates } from "~/interfaces/common"

export const spriteSizes = {
    "TYPE_1": {
        x: 72,
        y: 72
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