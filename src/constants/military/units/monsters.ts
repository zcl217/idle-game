import type { ISprite } from "~/interfaces/military/sprite"
import { spriteSizes, unitStates, spriteType } from "../sprites"
import { unitType } from "./unitTypes"

export const wolf1: ISprite = {
    spriteInfo: {
        damage: 25,
        melee: true,
        maxHp: 30,
        name: "Wolf",
        unitType: unitType.WOLF1,
        spriteSize: spriteSizes.TYPE_1,
        spriteType: spriteType.ENEMY,
        movementDelay: 950,
        animationSpeed: 1,
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
        facingRight: true
    },
    state: {
        currentState: unitStates.IDLE,
        currentFrame: 0,
        currentHp: 30,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offset: 0
}

export const wolf2: ISprite = {
    spriteInfo: {
        damage: 15,
        melee: true,
        maxHp: 150,
        name: "Wolf",
        unitType: unitType.WOLF2,
        spriteSize: spriteSizes.TYPE_1,
        spriteType: spriteType.ENEMY,
        movementDelay: 1000,
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
        currentState: unitStates.IDLE,
        currentFrame: 0,
        currentHp: 150,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offset: 0
}

export const wolf3: ISprite = {
    spriteInfo: {
        damage: 55,
        melee: true,
        maxHp: 300,
        name: "Wolf",
        unitType: unitType.WOLF3,
        spriteSize: spriteSizes.TYPE_1,
        spriteType: spriteType.ENEMY,
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
        currentState: unitStates.IDLE,
        currentFrame: 0,
        currentHp: 300,
        currentPathIndex: 0,
        currentFrameList: [],
    },
    offset: 0
}