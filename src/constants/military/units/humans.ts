import type { ISprite } from "~/interfaces/military/sprite"
import { UNIT_PATHS } from "../maps"
import { SPRITE_SIZES, UNIT_STATES, SPRITE_TYPE } from "../sprites"
import { UNIT_TYPES } from "./unitTypes"

export const HEAVY_INFANTRY: ISprite = {
    spriteInfo: {
        damage: 10,
        melee: true,
        maxHp: 50,
        name: "Heavy Infantry",
        // be careful of cyclical dependency.
        // the UNIT_TYPES mapping refers to this sprite,
        // so it doesn't make sense to refer to the unit type mapping again
        // to define the type of this.
        //unitType: UNIT_TYPES.HEAVY_INFANTRY,
        unitType: UNIT_TYPES.HEAVY_INFANTRY,
        spriteSize: SPRITE_SIZES.TYPE_2,
        spriteType: SPRITE_TYPE.PLAYER,
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

export const MAGE: ISprite = {
    spriteInfo: {
        damage: 5,
        attackRange: 2,
        melee: false,
        maxHp: 50,
        name: "Mage",
        // be careful of cyclical dependency.
        // the UNIT_TYPES mapping refers to this sprite,
        // so it doesn't make sense to refer to the unit type mapping again
        // to define the type of this.
        //unitType: UNIT_TYPES.HEAVY_INFANTRY,
        unitType: UNIT_TYPES.MAGE,
        spriteSize: SPRITE_SIZES.TYPE_1,
        spriteType: SPRITE_TYPE.PLAYER,
        animationSpeed: 1,
        hpBarOffsetX: 9,
        hpBarOffsetY: -15
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
        currentFrameList: [],
    },
    offsetX: 0,
}
