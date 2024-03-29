import type { ICoordinates } from "~/interfaces/common"

/*
    Sprites represent the basic framework that all units depend upon.
    They hold the information required to render and process units.
*/

export interface ISprite {
    spriteInfo: ISpriteInfo;
    position: IPosition;
    state: IState;
    // in case a sprite is a different size than usual, we'll need an offsetX to make sure
    // it's in the correct position
    offsetX: number;
    offsetY?: number;
}

// The info interface manages any properties that describe the sprite's stats
interface ISpriteInfo {
    damage: number;
    // if melee, you can only attack the 4 adjacent grids
    // if ranged, you can also attack the diagonal grids
    melee: boolean;
    attackRange?: number;
    maxHp: number;
    name: string;
    unitType: string;
    // a unique identifier. initialize this when we actually create the sprite
    unitId?: string;
    spriteSize: ISpriteSize;
    isEnemy: boolean;
    animationSpeed: number;
    // more specific animation speeds in case the all purpose animationSpeed isn't enough
    movementAnimationSpeed?: number;
    attackAnimationSpeed?: number;
    hpBarOffsetX: number;
    hpBarOffsetY?: number;
    specialAbility?: string;
}

// The position interface manages any position-related properties
interface IPosition {
    coordinates: ICoordinates;
    spriteSheetPositionX: number;
    spriteSheetPositionY: number;
    spriteSheetOffsetX?: number;
    facingRight: boolean;
    positionXTweened?: any;
    positionYTweened?: any;
    tweenedDelay?: number;
}

// The state interface manages the attributes of a sprite that change throughout the game
interface IState {
    currentState: string;
    currentFrame: number;
    currentHp: number;
    currentPathIndex?: number;
    currentFrameList: ICoordinates[];
    unitPath?: ICoordinates[];
    isDead?: boolean;
}

export interface ISpriteSize {
    x: number,
    y: number
}

export type ISpriteSheetInfo = {
    spriteSheet: string;
    idleFrames: ICoordinates[];
    attackFrames: ICoordinates[];
    moveFrames?: ICoordinates[];
}