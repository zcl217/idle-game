// displays m if over a million
// displays k if over a thousand
// parses numbers to two decimal places
import { resourceGeneratorMap } from '../constants/resourceTypes';
import { workerGeneratorMap } from '../constants/workerTypes';
import { scienceButtonPrereqs } from '~/constants/buttons/scienceButtons';
import { empireButtonPrereqs, empireButtonTypes } from '~/constants/buttons/empireButtons';
import { get } from 'svelte/store';
import {
    researchedSciences as researchedSciencesFromStore,
    obtainedResources as obtainedResourcesFromStore
} from '~/store/gameState';
import { BUTTON_CATEGORIES } from '~/constants/buttons/buttons';
import * as humanUnits from '~/constants/military/units/humans'
import { unitType } from '~/constants/military/units/unitTypes'
import { spriteSheetMap } from '~/constants/military/spriteSheetMap';
import type { ICoordinates, IPrereqsList } from '~/interfaces/common';
import type { ISprite } from '~/interfaces/military/sprite';
import { spriteSizes } from '~/constants/military/sprites';

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

export const calculateGenerationRate = (type: string, resources: any, workers: any) => {
    const generator = resourceGeneratorMap[type];
    if (!resources || !generator) return '0';
    let resourcesGenerated = resources[generator].value * resources[generator].generationValue;
    const workerType = workerGeneratorMap[type];
    if (!workers || !workerType) return resourceParser(resourcesGenerated);
    resourcesGenerated += workers[workerType].value * workers[workerType].generationValue;
    return resourceParser(resourcesGenerated);
}

export const buttonPrereqsMet = (type: string, buttonCategory: string) => {
    let prereqList = {} as IPrereqsList;
    switch (buttonCategory) {
        case BUTTON_CATEGORIES.EMPIRE:
            prereqList = empireButtonPrereqs;
            break;
        case BUTTON_CATEGORIES.SCIENCE:
            prereqList = scienceButtonPrereqs;
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
    return true;
}

export const getSprite = (input: string) => {
    switch (input) {
        case unitType.HEAVY_INFANTRY:
            return humanUnits.heavyInfantry;
        default:
            return {};
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