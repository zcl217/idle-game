<script lang="ts">
    import { resources } from "../store/resources";
    import { workers } from "../store/workers";
    import {
        RESOURCE_NAMES,
        RESOURCE_TYPES,
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
        IRON_SMELTER_COAL_INPUT,
        IRON_SMELTER_ORE_INPUT,
    } from "~/constants/gameState";
    // figure out how to manage resources (maybe from store?) do we use array for this or something with faster access like map?
    const displayGenerationRate = (type: string) => {
        // TODO: fix this. not sure if we even need this function when the
        // generation rates are being automatically determined by the existence of a limit
        return type !== RESOURCE_TYPES.STORAGE;
    };

    const resourcePrereqsMet = (type: string) => {
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
        if (formattedGenerationRate >= 0) prefix = "+";
        return `${prefix}${formattedGenerationRate}/s`;
    };

    const getResourceConsumption = (type: string): number => {
        switch (type) {
            case RESOURCE_TYPES.RAW_ORE:
                return $ironSmeltersActivated
                    ? $resources[RESOURCE_TYPES.IRON_SMELTER].value *
                          IRON_SMELTER_ORE_INPUT
                    : 0;
            case RESOURCE_TYPES.COAL:
                if ($ironSmeltersActivated) {
                    return (
                        $resources[RESOURCE_TYPES.IRON_SMELTER].value *
                        IRON_SMELTER_COAL_INPUT
                    );
                }
                if ($blastFurnacesActivated) {
                    return (
                        $resources[RESOURCE_TYPES.BLAST_FURNACE].value *
                        BLAST_FURNACE_COAL_INPUT
                    );
                }
                return 0;
            case RESOURCE_TYPES.IRON:
                return $blastFurnacesActivated
                    ? $resources[RESOURCE_TYPES.BLAST_FURNACE].value *
                          BLAST_FURNACE_IRON_INPUT
                    : 0;
            default:
                return 0;
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
                <p class="flex flex-row flex-wrap my-1">
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
                <p class="my-1">{RESOURCE_NAMES[type]}: {resource.value}</p>
            {/if}
        {/if}
    {/each}
</div>
