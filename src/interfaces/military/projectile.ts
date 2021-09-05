import type { ISprite } from "./sprite";

export interface IProjectile {
    spriteSheet: string;
    type: string;
    target: ISprite;
    projectileId: string;
    // projectile speed is just the delay for the tweened animation
    speed: number;
    // the homing and damage properties are determined by the unit that fires the projectile
    homing: boolean;
    damage: number;
    currentFrame?: number;
    hasAnimation?: boolean;
    positionXTweened?: any;
    positionYTweened?: any;
    positionSpring?: any;
    specialAbility?: string;
}