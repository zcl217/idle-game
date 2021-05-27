import type { ISprite } from "~/interfaces/military/sprite"
import { SPRITE_SIZES, UNIT_STATES, SPRITE_TYPE } from "../sprites"
import { UNIT_TYPES } from "./unitTypes"

export const WOLF1: ISprite = {
    spriteInfo: {
        damage: 25,
        melee: true,
        maxHp: 30,
        name: "Wolf",
        unitType: UNIT_TYPES.WOLF1,
        spriteSize: SPRITE_SIZES.TYPE_1,
        spriteType: SPRITE_TYPE.ENEMY,
        animationSpeed: 1,
        movementAnimationSpeed: 1,
        hpBarOffsetX: 11,
        hpBarOffsetY: -10
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
        tweenedDelay: 980,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 30,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offsetX: 0
}

export const WOLF2: ISprite = {
    spriteInfo: {
        damage: 15,
        melee: true,
        maxHp: 150,
        name: "Wolf",
        unitType: UNIT_TYPES.WOLF2,
        spriteSize: SPRITE_SIZES.TYPE_1,
        spriteType: SPRITE_TYPE.ENEMY,
        animationSpeed: 1,
        movementAnimationSpeed: 4,
        hpBarOffsetX: 0,
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
        tweenedDelay: 950,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 150,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offsetX: 0
}

export const WOLF3: ISprite = {
    spriteInfo: {
        damage: 55,
        melee: true,
        maxHp: 300,
        name: "Wolf",
        unitType: UNIT_TYPES.WOLF3,
        spriteSize: SPRITE_SIZES.TYPE_1,
        spriteType: SPRITE_TYPE.ENEMY,
        animationSpeed: 1,
        hpBarOffsetX: 0,
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 300,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offsetX: 0
}