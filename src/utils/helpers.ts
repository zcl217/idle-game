import { SCIENCE_BUTTON_PREREQS } from '~/constants/buttons/scienceButtons';
import { EMPIRE_BUTTON_PREREQS, EMPIRE_BUTTON_TYPES } from '~/constants/buttons/empireButtons';
import { get } from 'svelte/store';
import {
    researchedSciences as researchedSciencesFromStore,
    curStoryProgress,
} from '~/store/gameState';
import { obtainedResources as obtainedResourcesFromStore } from '~/store/resources';
import { BUTTON_CATEGORIES } from '~/constants/buttons/buttons';
import * as humanUnits from '~/constants/military/units/humans'
import { UNIT_TYPES } from '~/constants/military/units/unitTypes'
import type { ICoordinates, IPrereqsList } from '~/interfaces/common';
import type { ISprite } from '~/interfaces/military/sprite';
import { SPRITE_SIZES } from '~/constants/military/sprites';
import { STAGE_LIST } from '~/constants/military/stageList';

export const buttonPrereqsMet = (type: string, buttonCategory: string): boolean => {
    let prereqList = {} as IPrereqsList;
    switch (buttonCategory) {
        case BUTTON_CATEGORIES.EMPIRE:
            prereqList = EMPIRE_BUTTON_PREREQS;
            break;
        case BUTTON_CATEGORIES.SCIENCE:
            prereqList = SCIENCE_BUTTON_PREREQS;
            break;
        default:
            return false;
    }
    if (!prereqList[type]) return false;
    const { sciencePrereqs } = prereqList[type]
    const { resourcePrereqs } = prereqList[type]
    const researchedSciences = get(researchedSciencesFromStore);
    const obtainedResources = get(obtainedResourcesFromStore)
    for (const science of sciencePrereqs) {
        if (!researchedSciences.has(science)) return false;
    }
    for (const resource of resourcePrereqs) {
        if (!obtainedResources.has(resource)) return false;
    }
    if (prereqList[type].storyPrereq) {
        return get(curStoryProgress) >= prereqList[type].storyPrereq;
    }
    return true;
}

export const getSprite = (input: string): ISprite => {
    switch (input) {
        case UNIT_TYPES.SPEARMAN:
            return humanUnits.SPEARMAN;
        case UNIT_TYPES.PIKEMAN:
            return humanUnits.PIKEMAN;
        case UNIT_TYPES.HALBERDIER:
            return humanUnits.HALBERDIER;
        case UNIT_TYPES.FOOTPAD:
            return humanUnits.FOOTPAD;
        case UNIT_TYPES.OUTLAW:
            return humanUnits.OUTLAW;
        case UNIT_TYPES.HEAVY_INFANTRY:
            return humanUnits.HEAVY_INFANTRY;
        case UNIT_TYPES.SHOCKTROOPER:
            return humanUnits.SHOCKTROOPER;
        case UNIT_TYPES.SIEGETROOPER:
            return humanUnits.SIEGETROOPER;
        case UNIT_TYPES.MAGE:
            return humanUnits.MAGE;
        case UNIT_TYPES.ARCH_MAGE:
            return humanUnits.ARCH_MAGE;
        default:
            return {} as ISprite;
    }
}

export const getExpeditionBackgroundPosition = (sprite: ISprite): string => {
    return `${sprite.position.spriteSheetPositionX}px ${sprite.position.spriteSheetPositionY}px`;
};

export const getSpriteBackgroundPosition = (
    sprite: ISprite,
    idleFrames: ICoordinates[],
    currentFrame: number,
    isAnimating: boolean
): string => {
    // additional offset required to properly center type 2 sprites
    let nonAnimatingOffsetX = !isAnimating && sprite.spriteInfo.spriteSize === SPRITE_SIZES.TYPE_2 ? 10 : 0;
    let nonAnimatingOffsetY = !isAnimating && sprite.spriteInfo.spriteSize === SPRITE_SIZES.TYPE_2 ? 15 : 0;
    const spriteSheetPosition = idleFrames[currentFrame];
    const spriteSheetPositionX =
        spriteSheetPosition.col * -sprite.spriteInfo.spriteSize.x +
        (sprite.position.spriteSheetOffsetX || 0) / 1.5 - nonAnimatingOffsetX;
    const spriteSheetPositionY =
        spriteSheetPosition.row * -sprite.spriteInfo.spriteSize.y - nonAnimatingOffsetY;
    return `${spriteSheetPositionX}px ${spriteSheetPositionY}px`;
}

export const areAllZoneStagesCleared = (
    zone: string,
    clearedStages: Record<string, boolean>
) => {
    switch (zone) {
        case "1":
            return (
                clearedStages[STAGE_LIST["1-1"]] &&
                clearedStages[STAGE_LIST["1-2"]] &&
                clearedStages[STAGE_LIST["1-3"]] &&
                clearedStages[STAGE_LIST["1-4"]] &&
                clearedStages[STAGE_LIST["1-5"]]
            );
        case "2":
            return (
                clearedStages[STAGE_LIST["2-1"]] &&
                clearedStages[STAGE_LIST["2-2"]] &&
                clearedStages[STAGE_LIST["2-3"]] &&
                clearedStages[STAGE_LIST["2-4"]] &&
                clearedStages[STAGE_LIST["2-5"]]
            );
        case "3":
            return (
                clearedStages[STAGE_LIST["3-1"]] &&
                clearedStages[STAGE_LIST["3-2"]] &&
                clearedStages[STAGE_LIST["3-3"]] &&
                clearedStages[STAGE_LIST["3-4"]] &&
                clearedStages[STAGE_LIST["3-5"]]
            );
        default:
            return;
    }
};