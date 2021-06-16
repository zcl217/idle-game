import { get } from "svelte/store";
import { BLAST_FURNACE_INPUTS, BLAST_FURNACE_OUTPUTS, IRON_SMELTER_INPUTS, IRON_SMELTER_OUTPUTS, WORKSHOP_INPUTS, WORKSHOP_OUTPUTS } from "~/constants/resources/industry";
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
        default:
            break;
    }
}