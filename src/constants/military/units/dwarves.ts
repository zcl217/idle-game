import type { ISprite } from "~/interfaces/military/sprite";
import { SPECIAL_ABILITIES } from "../specialAbilities";
import { SPRITE_SIZES, UNIT_STATES } from "../sprites";
import { defaultHpBarOffsetX, defaultHpBarOffsetY } from "./humans";
import { UNIT_TYPES } from "./unitTypes";

export const THUNDERER: ISprite = {
    spriteInfo: {
        damage: 50,
        attackRange: 1,
        melee: false,
        maxHp: 60,
        name: "Thunderer",
        unitType: UNIT_TYPES.THUNDERER,
        spriteSize: SPRITE_SIZES.TYPE_1,
        isEnemy: false,
        animationSpeed: 2,
        attackAnimationSpeed: 1,
        hpBarOffsetX: defaultHpBarOffsetX,
        hpBarOffsetY: defaultHpBarOffsetY,
        specialAbility: SPECIAL_ABILITIES.AOE
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