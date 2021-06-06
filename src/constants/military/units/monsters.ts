import type { ISprite } from "~/interfaces/military/sprite"
import { SPRITE_SIZES, UNIT_STATES, SPRITE_TYPE } from "../sprites"
import { UNIT_TYPES } from "./unitTypes"

export const WOLF1: ISprite = {
    spriteInfo: {
        damage: 1,
        melee: true,
        maxHp: 15,
        name: "Wolf",
        unitType: UNIT_TYPES.WOLF1,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
        animationSpeed: 1,
        movementAnimationSpeed: 3,
        attackAnimationSpeed: 2,
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
        tweenedDelay: 1000,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 15,
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
        isEnemy: true,
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
        isEnemy: true,
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

export const SKELETON: ISprite = {
    spriteInfo: {
        damage: 5,
        melee: true,
        maxHp: 30,
        name: "Skeleton",
        unitType: UNIT_TYPES.SKELETON,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
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
        facingRight: true,
        tweenedDelay: 2000
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

export const SKELETON_ARCHER: ISprite = {
    spriteInfo: {
        damage: 1,
        attackRange: 1,
        melee: false,
        maxHp: 20,
        name: "Skeleton",
        unitType: UNIT_TYPES.SKELETON_ARCHER,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
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
        facingRight: true,
        tweenedDelay: 2000
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 20,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offsetX: 0
}

export const BAT: ISprite = {
    spriteInfo: {
        damage: 2,
        attackRange: 1,
        melee: false,
        maxHp: 20,
        name: "Bat",
        unitType: UNIT_TYPES.BAT,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
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
        facingRight: true,
        tweenedDelay: 2000
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 20,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offsetX: 0
}

export const GHOST: ISprite = {
    spriteInfo: {
        damage: 5,
        attackRange: 1,
        melee: false,
        maxHp: 20,
        name: "Ghost",
        unitType: UNIT_TYPES.GHOST,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
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
        facingRight: true,
        tweenedDelay: 2000
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 20,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offsetX: 0
}

export const SHADOW: ISprite = {
    spriteInfo: {
        damage: 5,
        melee: true,
        maxHp: 30,
        name: "Shadow",
        unitType: UNIT_TYPES.SHADOW,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
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
        facingRight: true,
        tweenedDelay: 2000
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

export const GHAST: ISprite = {
    spriteInfo: {
        damage: 5,
        melee: true,
        maxHp: 30,
        name: "Ghast",
        unitType: UNIT_TYPES.GHAST,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
        animationSpeed: 1,
        movementAnimationSpeed: 3,
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
        tweenedDelay: 2000
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
