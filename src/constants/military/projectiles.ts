import type { IProjectile } from "~/interfaces/military/projectile";
import type { ISprite } from "~/interfaces/military/sprite";
import { SPECIAL_ABILITIES } from "./specialAbilities";
import { UNIT_TYPES } from "./units/unitTypes";

export const PROJECTILE_TYPES: Record<string, string> = {
    FIREBALL: 'fireball',
    LARGE_FIREBALL: 'large fireball',
    SKELETON_ARCHER_WAIL: 'skeleton archer wail',
    GHOST_WAIL: 'ghost wail',
    STONE: 'stone',
    LARGE_STONE: 'large stone',
    THUNDERSTICK_BLAST: 'thunderstick blast'
}

export const FIREBALL: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/fireball1.png",
    type: PROJECTILE_TYPES.FIREBALL,
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 10
}

export const LARGE_FIREBALL: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/fireball2.png",
    type: PROJECTILE_TYPES.LARGE_WAIL,
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 100
}

export const SKELETON_ARCHER_WAIL: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/skeletonArcherWail.png",
    type: PROJECTILE_TYPES.SKELETON_ARCHER_WAIL,
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 3
}

export const GHOST_WAIL: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/ghostWail.png",
    type: PROJECTILE_TYPES.GHOST_WAIL,
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 5
}

export const STONE: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/stone.png",
    type: PROJECTILE_TYPES.STONE,
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 2
}

export const LARGE_STONE: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/largeStone.png",
    type: PROJECTILE_TYPES.LARGE_STONE,
    target: {} as ISprite,
    projectileId: '',
    speed: 200,
    homing: false,
    damage: 30
}

export const THUNDERSTICK_BLAST: IProjectile = {
    spriteSheet: "~/../sprites/projectiles/thunderstickBlast.png",
    type: PROJECTILE_TYPES.THUNDERSTICK_BLAST,
    target: {} as ISprite,
    projectileId: '',
    speed: 100,
    homing: false,
    damage: 50,
    currentFrame: 0,
    hasAnimation: true,
    specialAbility: SPECIAL_ABILITIES.AOE
}


export const UNIT_PROJECTILES: Record<string, IProjectile> = {
    [UNIT_TYPES.MAGE]: FIREBALL,
    [UNIT_TYPES.ARCH_MAGE]: LARGE_FIREBALL,
    [UNIT_TYPES.FOOTPAD]: STONE,
    [UNIT_TYPES.OUTLAW]: LARGE_STONE,
    [UNIT_TYPES.THUNDERER]: THUNDERSTICK_BLAST,
    [UNIT_TYPES.THUNDERGUARD]: THUNDERSTICK_BLAST,
    [UNIT_TYPES.DRAGONGUARD]: THUNDERSTICK_BLAST,
    [UNIT_TYPES.GHOST]: GHOST_WAIL,
    [UNIT_TYPES.SKELETON_ARCHER]: SKELETON_ARCHER_WAIL,
    [UNIT_TYPES.BAT]: SKELETON_ARCHER_WAIL,
}

export const THUNDERSTICK_BLAST_WIDTH = 100;
export const THUNDERSTICK_BLAST_HEIGHT = 150;