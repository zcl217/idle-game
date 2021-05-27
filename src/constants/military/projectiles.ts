import type { IProjectile } from "~/interfaces/military/projectile";
import type { ISprite } from "~/interfaces/military/sprite";
import { UNIT_TYPES } from "./units/unitTypes";

export const FIREBALL: IProjectile = {
    spriteSheet: "~/../sprites/FIREBALL1.png",
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 0
}

export const UNIT_PROJECTILES: Record<string, IProjectile> = {
    [UNIT_TYPES.MAGE]: FIREBALL
}

