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
import { buttonCategories } from '~/constants/buttons/buttons';
import * as humanUnits from '~/constants/military/units/humans'
import { unitType } from '~/constants/military/units/unitTypes'

export const resourceParser = (input) => {
    const million = 1000000;
    const thousand = 1000;
    let value = parseInt(input);
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

const parseDecimals = (input) => {
    return Math.round(input * 100) / 100;
}

export const calculateGenerationRate = (type, resources, workers) => {
    const generator = resourceGeneratorMap[type];
    if (!resources || !generator) return '0';
    let resourcesGenerated = resources[generator].value * resources[generator].generationValue;
    const workerType = workerGeneratorMap[type];
    if (!workers || !workerType) return resourceParser(resourcesGenerated);
    resourcesGenerated += workers[workerType].value * workers[workerType].generationValue;
    return resourceParser(resourcesGenerated);
}

export const buttonPrereqsMet = (type, buttonCategory) => {
    let prereqList = {};
    switch(buttonCategory) {
        case buttonCategories.EMPIRE:
            prereqList = empireButtonPrereqs;
            break;
        case buttonCategories.SCIENCE:
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

export const getSprite = (input) => {
    switch (input) {
        case unitType.HEAVY_INFANTRY:
            return humanUnits.heavyInfantry;
        default:
            return {};
    }
}

export const getBackgroundPosition = (sprite) => {
    return `${sprite.position.spriteSheetPositionX}px ${sprite.position.spriteSheetPositionY}px`;
};