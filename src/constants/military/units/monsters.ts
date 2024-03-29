import type { ISprite } from "~/interfaces/military/sprite"
import { SPECIAL_ABILITIES } from "../specialAbilities"
import { SPRITE_SIZES, UNIT_STATES } from "../sprites"
import { UNIT_TYPES } from "./unitTypes"

export const WOLF1: ISprite = {
    spriteInfo: {
        damage: 1,
        melee: true,
        maxHp: 10,
        name: "Wolf",
        unitType: UNIT_TYPES.WOLF1,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
        animationSpeed: 1,
        movementAnimationSpeed: 2,
        attackAnimationSpeed: 2,
        hpBarOffsetX: 11,
        hpBarOffsetY: -10,
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
        tweenedDelay: 1050,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 10,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offsetX: 0
}

export const WOLF2: ISprite = {
    spriteInfo: {
        damage: 5,
        melee: true,
        maxHp: 50,
        name: "Wolf",
        unitType: UNIT_TYPES.WOLF2,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
        animationSpeed: 1,
        movementAnimationSpeed: 2,
        attackAnimationSpeed: 2,
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
        tweenedDelay: 1050,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 50,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offsetX: 0
}

export const WOLF3: ISprite = {
    spriteInfo: {
        damage: 20,
        melee: true,
        maxHp: 300,
        name: "Wolf",
        unitType: UNIT_TYPES.WOLF3,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
        animationSpeed: 1,
        movementAnimationSpeed: 2,
        attackAnimationSpeed: 2,
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
        tweenedDelay: 1050,
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
        damage: 15,
        melee: true,
        maxHp: 200,
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
        currentHp: 200,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offsetX: 0
}

export const SKELETON_ARCHER: ISprite = {
    spriteInfo: {
        damage: 5,
        attackRange: 1,
        melee: false,
        maxHp: 20,
        name: "Skeleton",
        unitType: UNIT_TYPES.SKELETON_ARCHER,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
        animationSpeed: 1,
        movementAnimationSpeed: 3,
        hpBarOffsetX: 0,
        specialAbility: SPECIAL_ABILITIES.RANGED
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
        damage: 10,
        attackRange: 1,
        melee: false,
        maxHp: 100,
        name: "Bat",
        unitType: UNIT_TYPES.BAT,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
        animationSpeed: 1,
        hpBarOffsetX: 0,
        specialAbility: SPECIAL_ABILITIES.RANGED
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
        tweenedDelay: 550
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 100,
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
        maxHp: 100,
        name: "Ghost",
        unitType: UNIT_TYPES.GHOST,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
        animationSpeed: 1,
        hpBarOffsetX: 0,
        specialAbility: SPECIAL_ABILITIES.ETHEREAL
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
        tweenedDelay: 970
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 100,
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
        specialAbility: SPECIAL_ABILITIES.ETHEREAL
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
        damage: 50,
        melee: true,
        maxHp: 1000,
        name: "Ghast",
        unitType: UNIT_TYPES.GHAST,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: true,
        animationSpeed: 2,
        movementAnimationSpeed: 5,
        hpBarOffsetX: 0,
        specialAbility: SPECIAL_ABILITIES.GLOBAL_POISON
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
        tweenedDelay: 3970
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
