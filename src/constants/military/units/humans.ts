import type { ISprite } from "~/interfaces/military/sprite"
import { UNIT_PATHS } from "../maps"
import { spriteSizes, unitStates, spriteType } from "../sprites"
import { unitType } from "./unitTypes"

export const heavyInfantry: ISprite = {
    spriteInfo: {
        damage: 10,
        melee: true,
        maxHp: 50,
        name: "Heavy Infantry",
        // be careful of cyclical dependency.
        // the unitType mapping refers to this sprite,
        // so it doesn't make sense to refer to the unit type mapping again
        // to define the type of this.
        //unitType: unitType.HEAVY_INFANTRY,
        unitType: unitType.HEAVY_INFANTRY,
        spriteSize: spriteSizes.TYPE_2,
        spriteType: spriteType.PLAYER,
        animationSpeed: 1,
        hpBarOffsetX: 60,
        hpBarOffsetY: -30
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
        currentState: unitStates.IDLE,
        currentFrame: 0,
        currentHp: 50,
        currentFrameList: []
    },
    // this sprite happens to be wider than the others so it needs an offset
    offset: -55
}

export const mage: ISprite = {
    spriteInfo: {
        damage: 10,
        attackRange: 3,
        melee: false,
        maxHp: 50,
        name: "Mage",
        // be careful of cyclical dependency.
        // the unitType mapping refers to this sprite,
        // so it doesn't make sense to refer to the unit type mapping again
        // to define the type of this.
        //unitType: unitType.HEAVY_INFANTRY,
        unitType: unitType.MAGE,
        spriteSize: spriteSizes.TYPE_1,
        spriteType: spriteType.PLAYER,
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
    },
    state: {
        currentState: unitStates.IDLE,
        currentFrame: 0,
        currentHp: 50,
        currentFrameList: [],
    },
    offset: 0
}
