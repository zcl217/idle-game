import type { ISprite } from "~/interfaces/military/sprite"
import { UNIT_PATHS } from "../maps"
import { SPRITE_SIZES, UNIT_STATES, SPRITE_TYPE } from "../sprites"
import { UNIT_TYPES } from "./unitTypes"

const defaultHpBarOffsetX = 9;
const defaultHpBarOffsetY = -15;


export const SPEARMAN: ISprite = {
    spriteInfo: {
        damage: 5,
        melee: true,
        maxHp: 35,
        name: "Spearman",
        unitType: UNIT_TYPES.SPEARMAN,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: false,
        animationSpeed: 2,
        attackAnimationSpeed: 1,
        hpBarOffsetX: defaultHpBarOffsetX,
        hpBarOffsetY: defaultHpBarOffsetY
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 35,
        currentFrameList: [],
    },
    offsetX: 0,
}

export const PIKEMAN: ISprite = {
    spriteInfo: {
        damage: 5,
        melee: true,
        maxHp: 30,
        name: "Pikeman",
        unitType: UNIT_TYPES.PIKEMAN,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: false,
        animationSpeed: 2,
        attackAnimationSpeed: 1,
        hpBarOffsetX: defaultHpBarOffsetX,
        hpBarOffsetY: defaultHpBarOffsetY
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 30,
        currentFrameList: [],
    },
    offsetX: 0,
}

export const HALBERDIER: ISprite = {
    spriteInfo: {
        damage: 5,
        melee: true,
        maxHp: 30,
        name: "Halberdier",
        unitType: UNIT_TYPES.HALBERDIER,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: false,
        animationSpeed: 2,
        hpBarOffsetX: defaultHpBarOffsetX,
        hpBarOffsetY: defaultHpBarOffsetY
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 30,
        currentFrameList: [],
    },
    offsetX: 0,
}

export const FOOTPAD: ISprite = {
    spriteInfo: {
        damage: 1,
        attackRange: 1,
        melee: false,
        maxHp: 20,
        name: "Footpad",
        unitType: UNIT_TYPES.FOOTPAD,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: false,
        animationSpeed: 2,
        attackAnimationSpeed: 1,
        hpBarOffsetX: defaultHpBarOffsetX,
        hpBarOffsetY: defaultHpBarOffsetY
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 20,
        currentFrameList: [],
    },
    offsetX: 0,
}

export const OUTLAW: ISprite = {
    spriteInfo: {
        damage: 50,
        attackRange: 1,
        melee: false,
        maxHp: 100,
        name: "Halberdier",
        unitType: UNIT_TYPES.OUTLAW,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: false,
        animationSpeed: 2,
        attackAnimationSpeed: 1,
        hpBarOffsetX: defaultHpBarOffsetX,
        hpBarOffsetY: defaultHpBarOffsetY
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 100,
        currentFrameList: [],
    },
    offsetX: 0,
}


export const HEAVY_INFANTRY: ISprite = {
    spriteInfo: {
        damage: 100,
        melee: true,
        maxHp: 50,
        name: "Heavy Infantry",
        unitType: UNIT_TYPES.HEAVY_INFANTRY,
        spriteSize: SPRITE_SIZES.TYPE_2,
        isEnemy: false,
        animationSpeed: 3,
        attackAnimationSpeed: 1,
        hpBarOffsetX: 10,
        hpBarOffsetY: -40
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        spriteSheetOffsetX: -55,
        facingRight: true,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 50,
        currentFrameList: []
    },
    // this sprite happens to be wider than the others so it needs an offsetX
    offsetX: -50,
    offsetY: -20
}

export const SHOCKTROOPER: ISprite = {
    spriteInfo: {
        damage: 100,
        melee: true,
        maxHp: 50,
        name: "Shocktrooper",
        unitType: UNIT_TYPES.SHOCKTROOPER,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: false,
        animationSpeed: 3,
        attackAnimationSpeed: 2,
        hpBarOffsetX: defaultHpBarOffsetX,
        hpBarOffsetY: defaultHpBarOffsetY
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 50,
        currentFrameList: []
    },
    // this sprite happens to be wider than the others so it needs an offsetX
    offsetX: -50,
    offsetY: -20
}

export const SIEGETROOPER: ISprite = {
    spriteInfo: {
        damage: 100,
        melee: true,
        maxHp: 50,
        name: "Siegetrooper",
        unitType: UNIT_TYPES.SIEGETROOPER,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: false,
        animationSpeed: 3,
        attackAnimationSpeed: 2,
        hpBarOffsetX: defaultHpBarOffsetX,
        hpBarOffsetY: defaultHpBarOffsetY
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 50,
        currentFrameList: []
    },
    // this sprite happens to be wider than the others so it needs an offsetX
    offsetX: -50,
    offsetY: -20
}

export const MAGE: ISprite = {
    spriteInfo: {
        damage: 5,
        attackRange: 2,
        melee: false,
        maxHp: 50,
        name: "Mage",
        unitType: UNIT_TYPES.MAGE,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: false,
        animationSpeed: 2,
        attackAnimationSpeed: 1,
        hpBarOffsetX: defaultHpBarOffsetX,
        hpBarOffsetY: defaultHpBarOffsetY
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 20,
        currentFrameList: [],
    },
    offsetX: 0,
}

export const ARCH_MAGE: ISprite = {
    spriteInfo: {
        damage: 5,
        attackRange: 3,
        melee: false,
        maxHp: 50,
        name: "Arch Mage",
        unitType: UNIT_TYPES.ARCH_MAGE,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: false,
        animationSpeed: 2,
        attackAnimationSpeed: 1,
        hpBarOffsetX: defaultHpBarOffsetX,
        hpBarOffsetY: defaultHpBarOffsetY
    },
    position: {
        coordinates: {
            row: 0,
            col: 0
        },
        spriteSheetPositionX: 0,
        spriteSheetPositionY: 0,
        facingRight: true,
    },
    state: {
        currentState: UNIT_STATES.IDLE,
        currentFrame: 0,
        currentHp: 20,
        currentFrameList: [],
    },
    offsetX: 0,
}