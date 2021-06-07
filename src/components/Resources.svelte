<script lang="ts">
    import { resources } from "../store/resources";
    import { workers } from "../store/workers";
    import {
        RESOURCE_NAMES,
        RESOURCE_TYPES,
SPECIAL_RESOURCES,
    } from "../constants/resources/resourceTypes";
    import { RESOURCE_DISPLAY_PREREQS } from "~/constants/resources/resourcePrereqs";
    import { resourceParser } from "../utils/helpers";
    import {
        obtainedResources,
        researchedSciences,
        insufficientFood,
        ironSmeltersActivated,
        blastFurnacesActivated,
    } from "~/store/gameState";
    import { calculateGenerationRate } from "~/utils/resourceGeneration";
    import {
        BLAST_FURNACE_COAL_INPUT,
        BLAST_FURNACE_IRON_INPUT,
        BLAST_FURNACE_STEEL_OUTPUT,
        IRON_SMELTER_COAL_INPUT,
        IRON_SMELTER_IRON_OUTPUT,
        IRON_SMELTER_ORE_INPUT,
    } from "~/constants/gameState";
    const displayGenerationRate = (type: string) => {
        // TODO: fix this. not sure if we even need this function when the
        // generation rates are being automatically determined by the existence of a limit
        return type !== RESOURCE_TYPES.STORAGE;
    };

    const resourcePrereqsMet = (type: string) => {
        if (SPECIAL_RESOURCES.has(type) && $resources[type].value > 0) {
            return true;
        }
        if (!RESOURCE_DISPLAY_PREREQS[type]) return false;
        const { sciencePrereqs } = RESOURCE_DISPLAY_PREREQS[type];
        const { resourcePrereqs } = RESOURCE_DISPLAY_PREREQS[type];
        for (let science of sciencePrereqs) {
            if (!$researchedSciences.has(science)) return false;
        }
        for (let resource of resourcePrereqs) {
            if (!$obtainedResources.has(resource)) return false;
        }
        return true;
    };

    const formatGenerationRate = (type: string): string => {
        let prefix = "";
        let generationRate = calculateGenerationRate(
            type,
            $resources,
            $workers,
            $insufficientFood
        );
        let formattedGenerationRate =
            Math.round(parseFloat(generationRate) * 100) / 100;
        formattedGenerationRate -= getResourceConsumption(type);
        formattedGenerationRate += getAdditionalResourceGeneration(type);
        if (formattedGenerationRate >= 0) prefix = "+";
        return `${prefix}${formattedGenerationRate}/s`;
    };

    const getResourceConsumption = (type: string): number => {
        const ironSmelterCount = $resources[RESOURCE_TYPES.IRON_SMELTER].value;
        const blastFurnaceCount =
            $resources[RESOURCE_TYPES.BLAST_FURNACE].value;
        switch (type) {
            case RESOURCE_TYPES.RAW_ORE:
                return $ironSmeltersActivated
                    ? ironSmelterCount * IRON_SMELTER_ORE_INPUT
                    : 0;
            case RESOURCE_TYPES.COAL:
                const ironSmelterConsumption = ironSmelterCount * IRON_SMELTER_COAL_INPUT;
                const blastFurnaceConsumption = blastFurnaceCount * BLAST_FURNACE_COAL_INPUT;
                if ($ironSmeltersActivated && $blastFurnacesActivated) {
                    return ironSmelterConsumption + blastFurnaceConsumption
                }
                if ($ironSmeltersActivated) return ironSmelterConsumption;
                if ($blastFurnacesActivated) return blastFurnaceConsumption;
                break;
            case RESOURCE_TYPES.IRON:
                if ($blastFurnacesActivated) {
                    return blastFurnaceCount * BLAST_FURNACE_IRON_INPUT;
                }
                break;
            default:
                return 0;
        }
        return 0;
    };

    const getAdditionalResourceGeneration = (type: string) => {
        const ironSmelterCount = $resources[RESOURCE_TYPES.IRON_SMELTER].value;
        const blastFurnaceCount =
        $resources[RESOURCE_TYPES.BLAST_FURNACE].value;
        switch (type) {
            case RESOURCE_TYPES.IRON:
                if ($ironSmeltersActivated) {
                    if (!hasEnoughInputResource(ironSmelterCount, IRON_SMELTER_ORE_INPUT, RESOURCE_TYPES.RAW_ORE)) break;
                    if (!hasEnoughInputResource(ironSmelterCount, IRON_SMELTER_COAL_INPUT, RESOURCE_TYPES.COAL)) break;
                    return ironSmelterCount * IRON_SMELTER_IRON_OUTPUT;
                }
                break;
            case RESOURCE_TYPES.STEEL:
                if ($blastFurnacesActivated) {
                    if (!hasEnoughInputResource(blastFurnaceCount, BLAST_FURNACE_COAL_INPUT, RESOURCE_TYPES.COAL)) break;
                    if (!hasEnoughInputResource(blastFurnaceCount, BLAST_FURNACE_IRON_INPUT, RESOURCE_TYPES.IRON)) break;
                    return blastFurnaceCount * BLAST_FURNACE_STEEL_OUTPUT;
                }
                break;
            default:
                return 0;
        }
        return 0;
    };

    const hasEnoughInputResource = (
        productionFacilityCount: number,
        consumptionRate: number,
        resourceType: string
    ) => {
        const resourcesRequired = productionFacilityCount * consumptionRate;
        switch (resourceType) {
            case RESOURCE_TYPES.RAW_ORE:
                return $resources[RESOURCE_TYPES.RAW_ORE].value > resourcesRequired;
            case RESOURCE_TYPES.COAL:
                return $resources[RESOURCE_TYPES.COAL].value > resourcesRequired;
            case RESOURCE_TYPES.IRON:
                return $resources[RESOURCE_TYPES.IRON].value > resourcesRequired;
            default:
                return true;
        }
    };

    const redText = (type: string) => {
        return type === RESOURCE_TYPES.FOOD && $insufficientFood;
    };
</script>

<div class="mt-5">
    {#each Object.entries($resources) as [type, resource]}
        {#if resourcePrereqsMet(type)}
            {#if resource.displayGenerationRate}
                <p class="flex flex-row flex-wrap my-2">
                    {RESOURCE_NAMES[type]}: {resourceParser(
                        resource.value
                    )}/{resourceParser(resource.limit)}
                    {#if displayGenerationRate(type)}
                        <div class="ml-3 {redText(type) ? 'text-red-500' : ''}">
                            {formatGenerationRate(type)}
                        </div>
                    {/if}
                </p>
            {:else}
                <p class="my-2">{RESOURCE_NAMES[type]}: {resource.value}</p>
            {/if}
        {/if}
    {/each}
</div>
