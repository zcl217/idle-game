// displays m if over a million
// displays k if over a thousand
// parses numbers to two decimal places
import { SCIENCE_BUTTON_PREREQS } from '~/constants/buttons/scienceButtons';
import { EMPIRE_BUTTON_PREREQS } from '~/constants/buttons/empireButtons';
import { get } from 'svelte/store';
import {
    researchedSciences as researchedSciencesFromStore,
    obtainedResources as obtainedResourcesFromStore,
    curStoryProgress,
} from '~/store/gameState';
import { BUTTON_CATEGORIES } from '~/constants/buttons/buttons';
import * as humanUnits from '~/constants/military/units/humans'
import { UNIT_TYPES } from '~/constants/military/units/unitTypes'
import { SPRITESHEET_MAP } from '~/constants/military/spriteSheetMap';
import type { ICoordinates, IPrereqsList } from '~/interfaces/common';
import type { ISprite } from '~/interfaces/military/sprite';
import { SPRITE_SIZES } from '~/constants/military/sprites';

export const resourceParser = (value: number): string => {
    const million = 1000000;
    const thousand = 1000;
    let parsedValue = '';
    if (value >= million) {
        parsedValue = parseDecimals(value / million).toString();
        parsedValue += 'm';
    } else if (value >= thousand) {
        parsedValue = parseDecimals(value / thousand).toString();
        parsedValue += 'k';
    } else {
        parsedValue = parseDecimals(value).toString();
    }
    return parsedValue;
}

const parseDecimals = (input: number) => {
    return Math.round(input * 100) / 100;
}

export const buttonPrereqsMet = (type: string, buttonCategory: string) => {
    let prereqList = {} as IPrereqsList;
    switch (buttonCategory) {
        case BUTTON_CATEGORIES.EMPIRE:
            prereqList = EMPIRE_BUTTON_PREREQS;
            break;
        case BUTTON_CATEGORIES.SCIENCE:
            prereqList = SCIENCE_BUTTON_PREREQS;
            break;
        default:
            return;
    }
    if (!prereqList[type]) return false;
    const { sciencePrereqs } = prereqList[type]
    const { resourcePrereqs } = prereqList[type]
    const researchedSciences = get(researchedSciencesFromStore);
    const obtainedResources = get(obtainedResourcesFromStore)
    for (let science of sciencePrereqs) {
        if (!researchedSciences.has(science)) return false;
    }
    for (let resource of resourcePrereqs) {
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

export const getExpeditionBackgroundPosition = (sprite: ISprite) => {
    return `${sprite.position.spriteSheetPositionX}px ${sprite.position.spriteSheetPositionY}px`;
};

export const getMenuBackgroundPosition = (sprite: ISprite, idleFrames: ICoordinates[], currentFrame: number) => {
    const spriteSheetPosition = idleFrames[currentFrame];
    let spriteSheetPositionX =
        spriteSheetPosition.col * -sprite.spriteInfo.spriteSize.x +
        (sprite.position.spriteSheetOffsetX || 0) / 1.5;
    let spriteSheetPositionY =
        spriteSheetPosition.row * -sprite.spriteInfo.spriteSize.y;
    return `${spriteSheetPositionX}px ${spriteSheetPositionY}px`;
}
