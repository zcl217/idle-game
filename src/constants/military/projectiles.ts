import type { IProjectile } from "~/interfaces/military/projectile";
import type { ISprite } from "~/interfaces/military/sprite";
import { UNIT_TYPES } from "./units/unitTypes";

export const FIREBALL: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/fireball1.png",
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 10
}

export const LARGE_FIREBALL: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/fireball2.png",
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 100
}

export const SKELETON_ARCHER_WAIL: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/skeletonArcherWail.png",
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 3
}

export const GHOST_WAIL: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/ghostWail.png",
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 5
}

export const STONE: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/stone.png",
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 2
}

export const LARGE_STONE: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/largeStone.png",
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 30
}


export const UNIT_PROJECTILES: Record<string, IProjectile> = {
    [UNIT_TYPES.MAGE]: FIREBALL,
    [UNIT_TYPES.ARCH_MAGE]: LARGE_FIREBALL,
    [UNIT_TYPES.FOOTPAD]: STONE,
    [UNIT_TYPES.OUTLAW]: LARGE_STONE,
    [UNIT_TYPES.GHOST]: GHOST_WAIL,
    [UNIT_TYPES.SKELETON_ARCHER]: SKELETON_ARCHER_WAIL,
    [UNIT_TYPES.BAT]: SKELETON_ARCHER_WAIL,
}

