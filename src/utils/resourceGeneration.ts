import { get } from "svelte/store";
import { RESOURCE_GENERATOR_MAP, RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
import { WORKER_GENERATOR_MAP, WORKER_TYPES } from "~/constants/workers/workerTypes";
import { researchedSciences as researchedSciencesFromStore } from '~/store/gameState';
import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
import { GRANARY_BONUS, MANSION_COAL_CONSUMPTION, QUARRY_BONUS, SAWMILL_BONUS, TAVERN_FOOD_CONSUMPTION, UNIVERSITY_BONUS, WORKER_FOOD_CONSUMPTION, WORKER_TAXATION_BONUS } from "~/constants/gameState";
import type { IResourceList } from "~/interfaces/resource";
import { resourcesFromExpeditions } from "~/store/resources";
import { totalWorkers } from "~/store/workers";

export const calculateGenerationRate = (type: string, resources: any, workers: any, insufficientFood: boolean, isDev: boolean): number => {
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
    let resourcesFromScience = 0;
    const researchedSciences = get(researchedSciencesFromStore);
    switch (type) {
        case RESOURCE_TYPES.GOLD:
            if (researchedSciences.has(SCIENCE_BUTTON_TYPES.TAXATION))
                resourcesFromScience = get(totalWorkers) * WORKER_TAXATION_BONUS;
            break;
        default:
            break;
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
    if (isDev) resourcesGenerated += 10000;
    return resourcesGenerated;
}

export const getResourceConsumption = (type: string, resources: any, workers: any): number => {
    switch (type) {
        case RESOURCE_TYPES.FOOD: {
            const maxWorkers = resources[RESOURCE_TYPES.HOUSE].value;
            const assignedWorkers = maxWorkers - workers[WORKER_TYPES.UNASSIGNED].value;
            const totalWorkerConsumption = assignedWorkers * WORKER_FOOD_CONSUMPTION;
            const totalTavernConsumption = resources[RESOURCE_TYPES.TAVERN].value * TAVERN_FOOD_CONSUMPTION;
            return totalWorkerConsumption + totalTavernConsumption;
        }
        case RESOURCE_TYPES.COAL: {
            const mansions = resources[RESOURCE_TYPES.MANSION].value;
            return mansions * MANSION_COAL_CONSUMPTION;
        }
        default:
            return 0;
    }
}

export const calculateResourceMultiplier = (type: string, resources: any): number => {
    const researchedSciences = get(researchedSciencesFromStore);
    switch (type) {
        case RESOURCE_TYPES.FOOD:
            return calculateFoodMulitplier(researchedSciences, resources);
        case RESOURCE_TYPES.WOOD:
            return calculateWoodMulitplier(researchedSciences, resources);
        case RESOURCE_TYPES.KNOWLEDGE:
            return calculateKnowledgeMulitplier(researchedSciences, resources);
        case RESOURCE_TYPES.RAW_ORE:
            return calculateMiningMultiplier(researchedSciences, resources);
        case RESOURCE_TYPES.COAL:
            return calculateMiningMultiplier(researchedSciences, resources) * 0.2;
        case RESOURCE_TYPES.GOLD:
            return calculateMiningMultiplier(researchedSciences, resources) * 0.001;
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
    multiplier += resources[RESOURCE_TYPES.UNIVERSITY].value * UNIVERSITY_BONUS;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.BLOCK_PRINTING)) multiplier += 0.5;
    return multiplier;
}

const calculateMiningMultiplier = (researchedSciences: Set<string>, resources: any): number => {
    let multiplier = 1;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.WOODEN_PICKAXE)) multiplier += 0.5;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.IRON_PICKAXE)) multiplier += 0.5;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.SHAFT_MINING)) multiplier += 0.5;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.MITHRIL_PICKAXE)) multiplier += 0.5;
    if (researchedSciences.has(SCIENCE_BUTTON_TYPES.ADAMANTITE_PICKAXE)) multiplier += 0.5;
    multiplier += resources[RESOURCE_TYPES.QUARRY].value * QUARRY_BONUS;
    return multiplier;
}

const calculateFurMultiplier = (researchedSciences: Set<string>): number => {
    const multiplier = 1;
    return multiplier;
}

