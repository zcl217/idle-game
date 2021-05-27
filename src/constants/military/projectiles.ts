import type { IProjectile } from "~/interfaces/military/projectile";
import type { ISprite } from "~/interfaces/military/sprite";
import { unitType } from "./units/unitTypes";

export const fireball: IProjectile = {
    spriteSheet: "~/../sprites/fireball1.png",
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 0
}

export const unitProjectiles: Record<string, IProjectile> = {
    [unitType.MAGE]: fireball
}

