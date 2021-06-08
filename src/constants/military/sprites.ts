import { CELL_HEIGHT, CELL_WIDTH } from "./maps"

export const SPRITE_SIZES = {
    "TYPE_1": {
        x: CELL_WIDTH,
        y: CELL_HEIGHT
    },
    "TYPE_2": {
        x: 168,
        y: 104
    }
}

export const UNIT_STATES = {
    IDLE: "idle",
    ATTACK: "attack",
    MOVE: "move",
}

export const SPRITE_TYPE = {
    PLAYER: 'player',
    ENEMY: 'enemy',
}