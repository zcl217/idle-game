import { get } from "svelte/store";
import { RESOURCE_GENERATOR_MAP, RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
import { WORKER_GENERATOR_MAP, WORKER_TYPES } from "~/constants/workers/workerTypes";
import { resourceParser } from "./helpers";
import {
    researchedSciences as researchedSciencesFromStore, resourcesFromExpeditions
} from '~/store/gameState';
import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
import { GRANARY_BONUS, SAWMILL_BONUS, WORKER_FOOD_CONSUMPTION } from "~/constants/gameState";
import type { IResourceList } from "~/interfaces/resource";

export const calculateGenerationRate = (type: string, resources: any, workers: any, insufficientFood: boolean): string => {
    const generator = RESOURCE_GENERATOR_MAP[type];
    let resourcesFromBuildings = 0;
    if (resources && generator) {
        resourcesFromBuildings = resources[generator].value * resources[generator].generationValue;
    }
    const workerType = WORKER_GENERATOR_MAP[type];
    let resourcesFromWorkers = 0;
    if (workers && workerType) {
        resourcesFromWorkers = workers[workerType].value * workers[workerType].generationValue;
        if (insufficientFood) resourcesFromWorkers *= 0.5;
    }
    const resourceConsumption = getResourceConsumption(type, resources, workers);
    // if 0 food && resource generated from workers and buildings is less than worker consumption
    // decrease generated value
    let resourcesGenerated = resourcesFromBuildings + resourcesFromWorkers;
    const multiplier = calculateResourceMultiplier(type, resources);
    resourcesGenerated *= multiplier;
    // we don't want to include negative bonuses into the multiplier
    resourcesGenerated -= resourceConsumption;
    resourcesGenerated += get(resourcesFromExpeditions)[type];
    return resourceParser(resourcesGenerated);
}

const getResourceConsumption = (type: string, resources: any, workers: any): number => {
    switch(type) {
        case RESOURCE_TYPES.FOOD: {
            const maxWorkers = resources[RESOURCE_TYPES.HOMES].value;
            const assignedWorkers = maxWorkers - workers[WORKER_TYPES.UNASSIGNED].value;
            return assignedWorkers * WORKER_FOOD_CONSUMPTION;
        }
        default:
            return 0;
    }
}

const calculateResourceMultiplier = (type: string, resources: any): number => {
    const researchedSciences = get(researchedSciencesFromStore);
    switch (type) {
        case RESOURCE_TYPES.FOOD:
            return calculateFoodMulitplier(researchedSciences, resources);
        case RESOURCE_TYPES.WOOD:
            return calculateWoodMulitplier(researchedSciences, resources);
        case RESOURCE_TYPES.KNOWLEDGE:
            return calculateKnowledgeMulitplier(researchedSciences, resources);
        case RESOURCE_TYPES.RAW_ORE:
            return calculateMiningMultiplier(researchedSciences);
        case RESOURCE_TYPES.COAL:
            return calculateMiningMultiplier(researchedSciences) * 0.2;
        case RESOURCE_TYPES.GOLD:
            return calculateMiningMultiplier(researchedSciences) * 0.005;
        case RESOURCE_TYPES.FURS:
            return calculateFurMultiplier(researchedSciences);
        default:
            return 1;
    }
}

const calculateFoodMulitplier = (researchedSciences: Set<string>, resources: IResourceList): number => {
    let multiplier = 1;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.HORSE_COLLAR)) multiplier += 0.5;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.HEAVY_PLOW)) multiplier += 0.5;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.CROP_ROTATION)) multiplier += 0.5;
    multiplier += resources[RESOURCE_TYPES.GRANARY].value * GRANARY_BONUS;
    return multiplier;
}

const calculateWoodMulitplier = (researchedSciences: Set<string>, resources: any): number => {
    let multiplier = 1;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.DOUBLE_BIT_AXE)) multiplier += 0.5;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.BOW_SAW)) multiplier += 0.5;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.TWO_MAN_SAW)) multiplier += 0.5;
    multiplier += resources[RESOURCE_TYPES.SAWMILL].value * SAWMILL_BONUS;
    return multiplier;
}

const calculateKnowledgeMulitplier = (researchedSciences: Set<string>, resources: IResourceList): number => {
    let multiplier = 1;
    multiplier += resources[RESOURCE_TYPES.LIBRARIES].value * 0.05;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.BLOCK_PRINTING)) multiplier += 0.5;
    return multiplier;
}

const calculateMiningMultiplier = (researchedSciences: Set<string>): number => {
    let multiplier = 1;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.WOODEN_PICKAXE)) multiplier += 0.5;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.IRON_PICKAXE)) multiplier += 0.5;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.SHAFT_MINING)) multiplier += 0.5;
    return multiplier;
}

const calculateFurMultiplier = (researchedSciences: Set<string>): number => {
    const multiplier = 1;
    return multiplier;
}

