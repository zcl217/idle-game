import { get } from "svelte/store";
import { EMPIRE_BUTTON_TYPES, INITIAL_EMPIRE_BUTTON_COSTS } from "~/constants/buttons/empireButtons";
import { BLAST_FURNACE_INPUTS, BLAST_FURNACE_OUTPUTS, IRON_SMELTER_INPUTS, IRON_SMELTER_OUTPUTS, MAGIC_FURNACE_INPUTS, MAGIC_FURNACE_OUTPUTS, MITHRIL_FURNACE_INPUTS, MITHRIL_FURNACE_OUTPUTS, WORKSHOP_INPUTS, WORKSHOP_OUTPUTS } from "~/constants/resources/industry";
import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
import type { IResourceList } from "~/interfaces/resource";

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

const parseDecimals = (input: number): number => {
    return Math.round(input * 100) / 100;
}

export const hasEnoughResources = (buttonCostList: any, resources: IResourceList, buttonType: string): boolean => {
    for (const resource of buttonCostList[buttonType]) {
        const curResourceAmount = resources[resource.type].value;
        if (curResourceAmount < resource.cost) return false;
    }
    return true;
};

export const spendResources = (buttonCostList: any, resources: any, buttonType: string): void => {
    for (const button of buttonCostList[buttonType]) {
        resources.decrementResourceValue(
            button.type,
            button.cost
        );
    }
};

export const getIndustryInputList = (industryBuilding: string): Record<string, number> => {
    switch (industryBuilding) {
        case RESOURCE_TYPES.WORKSHOP:
            return WORKSHOP_INPUTS;
        case RESOURCE_TYPES.IRON_SMELTER:
            return IRON_SMELTER_INPUTS;
        case RESOURCE_TYPES.BLAST_FURNACE:
            return BLAST_FURNACE_INPUTS;
        case RESOURCE_TYPES.MITHRIL_FURNACE:
            return MITHRIL_FURNACE_INPUTS;
        case RESOURCE_TYPES.MAGIC_FURNACE:
            return MAGIC_FURNACE_INPUTS;
        default:
            break;
    }
}

export const getIndustryOutputList = (industryBuilding: string): Record<string, number> => {
    switch (industryBuilding) {
        case RESOURCE_TYPES.WORKSHOP:
            return WORKSHOP_OUTPUTS;
        case RESOURCE_TYPES.IRON_SMELTER:
            return IRON_SMELTER_OUTPUTS;
        case RESOURCE_TYPES.BLAST_FURNACE:
            return BLAST_FURNACE_OUTPUTS;
        case RESOURCE_TYPES.MITHRIL_FURNACE:
            return MITHRIL_FURNACE_OUTPUTS;
        case RESOURCE_TYPES.MAGIC_FURNACE:
            return MAGIC_FURNACE_OUTPUTS;
        default:
            break;
    }
}

export const buildingCostCalculator = (buttonType: string, buildingsOwned: number, resourceType: string) => {
    const baseCost = INITIAL_EMPIRE_BUTTON_COSTS[buttonType].find(i => i.type === resourceType)
    if (!baseCost) return 0;
    switch (buttonType) {
        case EMPIRE_BUTTON_TYPES.CREATE_FARM:
        case EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM:
            return baseCost.cost * Math.pow(1.1, buildingsOwned) + 1;
        case EMPIRE_BUTTON_TYPES.BUILD_STORAGE:
        case EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE:
        case EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE:
        case EMPIRE_BUTTON_TYPES.BUILD_HOUSE:
        case EMPIRE_BUTTON_TYPES.BUILD_UNIVERSITY:
            return baseCost.cost * Math.pow(1.1, buildingsOwned);
        case EMPIRE_BUTTON_TYPES.BUILD_GRANARY:
        case EMPIRE_BUTTON_TYPES.BUILD_SAWMILL:
        case EMPIRE_BUTTON_TYPES.BUILD_QUARRY:
            return baseCost.cost * Math.pow(1.2, buildingsOwned);
        case EMPIRE_BUTTON_TYPES.BUILD_WORKSHOP:
        case EMPIRE_BUTTON_TYPES.BUILD_IRON_SMELTER:
        case EMPIRE_BUTTON_TYPES.BUILD_BLAST_FURNACE:
        case EMPIRE_BUTTON_TYPES.BUILD_MITHRIL_FURNACE:
        case EMPIRE_BUTTON_TYPES.BUILD_MAGIC_FURNACE:
            return baseCost.cost * Math.pow(1.05, buildingsOwned);
        default:
            return baseCost.cost * Math.pow(1.1, buildingsOwned);
    }
}