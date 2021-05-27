import type { ISprite } from "./sprite";

export interface IProjectile {
    spriteSheet: string;
    target: ISprite;
    projectileId: string;
    // projectile speed is just the delay for the tweened animation
    speed: number;
    homing: boolean;
    damage: number;
    positionXTweened?: any;
    positionYTweened?: any;
    positionSpring?: any;
}