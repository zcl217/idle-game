import type { ISprite } from "~/interfaces/military/sprite"
import { SPRITE_SIZES, UNIT_STATES } from "../sprites"
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
        damage: 15,
        melee: true,
        maxHp: 120,
        name: "Pikeman",
        unitType: UNIT_TYPES.PIKEMAN,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: false,
        animationSpeed: 2,
        attackAnimationSpeed: 3,
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
        currentHp: 120,
        currentFrameList: [],
    },
    offsetX: 0,
}

export const HALBERDIER: ISprite = {
    spriteInfo: {
        damage: 25,
        melee: true,
        maxHp: 200,
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
        currentHp: 200,
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
        damage: 5,
        attackRange: 1,
        melee: false,
        maxHp: 40,
        name: "Outlaw",
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
        currentHp: 40,
        currentFrameList: [],
    },
    offsetX: 0,
}


export const HEAVY_INFANTRY: ISprite = {
    spriteInfo: {
        damage: 20,
        melee: true,
        maxHp: 100,
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
        currentHp: 100,
        currentFrameList: []
    },
    // this sprite happens to be wider than the others so it needs an offsetX
    offsetX: -50,
    offsetY: -20
}

export const SHOCKTROOPER: ISprite = {
    spriteInfo: {
        damage: 30,
        melee: true,
        maxHp: 150,
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
        currentHp: 150,
        currentFrameList: []
    },
    offsetX: 0
}

export const SIEGETROOPER: ISprite = {
    spriteInfo: {
        damage: 50,
        melee: true,
        maxHp: 500,
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
        currentHp: 500,
        currentFrameList: []
    },
    offsetX: 0
}

export const MAGE: ISprite = {
    spriteInfo: {
        damage: 6,
        attackRange: 2,
        melee: false,
        maxHp: 40,
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
        currentHp: 40,
        currentFrameList: [],
    },
    offsetX: 0,
}

export const ARCH_MAGE: ISprite = {
    spriteInfo: {
        damage: 50,
        attackRange: 3,
        melee: false,
        maxHp: 60,
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
        currentHp: 60,
        currentFrameList: [],
    },
    offsetX: 0,
}