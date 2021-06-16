<script lang="ts">
import { keyBy } from "lodash";

    import { onDestroy } from "svelte";
    import { WORKER_FOOD_CONSUMPTION } from "~/constants/gameState";

    import {
        BLAST_FURNACE_COAL_INPUT,
        BLAST_FURNACE_INPUTS,
        BLAST_FURNACE_IRON_INPUT,
        BLAST_FURNACE_STEEL_OUTPUT,
        IRON_SMELTER_COAL_INPUT,
        IRON_SMELTER_INPUTS,
        IRON_SMELTER_IRON_OUTPUT,
        IRON_SMELTER_ORE_INPUT,
    } from "~/constants/resources/industry";

    import {
        RESOURCE_GENERATOR_MAP,
        RESOURCE_NAMES,
        RESOURCE_TYPES,
    } from "~/constants/resources/resourceTypes";
    import {
        WORKER_GENERATOR_MAP,
        WORKER_TYPES,
    } from "~/constants/workers/workerTypes";
    import type { IResource } from "~/interfaces/resource";
    import {
        displayResourceInfoBox,
        resourceName,
        resourceProfitsAndLosses,
        rowPositionX,
        rowPositionY,
    } from "~/store/infoBox";
    import {
        blastFurnacesActivated,
        insufficientFood,
        ironSmeltersActivated,
        resources,
        resourcesFromExpeditions,
    } from "~/store/resources";
    import { workers } from "~/store/workers";
    import {
        calculateGenerationRate,
        calculateResourceMultiplier,
    } from "~/utils/resourceGeneration";

    import { resourceParser } from "~/utils/resourceHelpers";

    export let resource: IResource, type: string;
    let formattedGenerationRate = '';
    $: {
        $resources;
        formattedGenerationRate = formatGenerationRate(type);
    }

    const formatGenerationRate = (type: string): string => {
        let generationRate = calculateGenerationRate(
            type,
            $resources,
            $workers,
            $insufficientFood
        );
        generationRate -= getResourceConsumption(type);
        generationRate += getAdditionalResourceGeneration(type);
        const prefix = generationRate >= 0 ? "+" : "";
        const formattedGenerationRate = resourceParser(generationRate);
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
                const ironSmelterConsumption =
                    ironSmelterCount * IRON_SMELTER_COAL_INPUT;
                const blastFurnaceConsumption =
                    blastFurnaceCount * BLAST_FURNACE_COAL_INPUT;
                if ($ironSmeltersActivated && $blastFurnacesActivated) {
                    return ironSmelterConsumption + blastFurnaceConsumption;
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
                if (!$ironSmeltersActivated) return 0;
                for (const type in IRON_SMELTER_INPUTS) {
                    if (
                        !hasEnoughInputResource(
                            ironSmelterCount,
                            IRON_SMELTER_INPUTS[type],
                            type
                        )
                    )
                        return 0;
                }
                return ironSmelterCount * IRON_SMELTER_IRON_OUTPUT;
            case RESOURCE_TYPES.STEEL:
                if (!$blastFurnacesActivated) return 0;
                for (const type in BLAST_FURNACE_INPUTS) {
                    if (
                        !hasEnoughInputResource(
                            blastFurnaceCount,
                            BLAST_FURNACE_INPUTS[type],
                            type
                        )
                    )
                        return 0;
                }
                return blastFurnaceCount * BLAST_FURNACE_STEEL_OUTPUT;
            default:
                return 0;
        }
    };

    const hasEnoughInputResource = (
        productionFacilityCount: number,
        consumptionRate: number,
        resourceType: string
    ) => {
        const resourcesRequired = productionFacilityCount * consumptionRate;
        switch (resourceType) {
            case RESOURCE_TYPES.RAW_ORE:
                return (
                    $resources[RESOURCE_TYPES.RAW_ORE].value > resourcesRequired
                );
            case RESOURCE_TYPES.COAL:
                return (
                    $resources[RESOURCE_TYPES.COAL].value > resourcesRequired
                );
            case RESOURCE_TYPES.IRON:
                return (
                    $resources[RESOURCE_TYPES.IRON].value > resourcesRequired
                );
            default:
                return true;
        }
    };

    const redText = (type: string) => {
        return type === RESOURCE_TYPES.FOOD && $insufficientFood;
    };

    const getProfitList = (): Record<string, number> => {
        const profitList: Record<string, number> = {};
        const multiplier = calculateResourceMultiplier(type, $resources);
        // profits
        const generator = RESOURCE_GENERATOR_MAP[type];
        if (generator) {
            const resourcesFromBuildings =
                $resources[generator].value *
                $resources[generator].generationValue;

            profitList[RESOURCE_NAMES[generator]] =
                resourcesFromBuildings * multiplier;
        }
        const workerType = WORKER_GENERATOR_MAP[type];
        if (workerType) {
            let resourcesFromWorkers =
                $workers[workerType].value *
                $workers[workerType].generationValue;
            if ($insufficientFood) resourcesFromWorkers *= 0.5;
            profitList[workerType] = resourcesFromWorkers * multiplier;
        }
        const expeditionProfit = $resourcesFromExpeditions[type];
        if (expeditionProfit > 0) {
            profitList["expeditions"] = expeditionProfit;
        }
        getIndustryGenerationForProfitList(profitList, type);

        // losses
        // we don't want to include negative bonuses into the multiplier
        if (type === RESOURCE_TYPES.FOOD) {
            const maxWorkers = $resources[RESOURCE_TYPES.HOUSE].value;
            const assignedWorkers =
                maxWorkers - $workers[WORKER_TYPES.UNASSIGNED].value;
            const foodConsumption = assignedWorkers * WORKER_FOOD_CONSUMPTION;
            profitList["workers"] = -1 * foodConsumption;
        }
        getResourceConsumptionForProfitList(profitList, type);

        return profitList;
    };

    const getIndustryGenerationForProfitList = (
        profitList: Record<string, number>,
        type: string
    ) => {
        const workshopCount = $resources[RESOURCE_TYPES.WORKSHOP].value;
        const ironSmelterCount = $resources[RESOURCE_TYPES.IRON_SMELTER].value;
        const blastFurnaceCount =
            $resources[RESOURCE_TYPES.BLAST_FURNACE].value;
        const workshopName = RESOURCE_NAMES[RESOURCE_TYPES.WORKSHOP];
        const ironSmelterName = RESOURCE_NAMES[RESOURCE_TYPES.IRON_SMELTER];
        const blastFurnaceName = RESOURCE_NAMES[RESOURCE_TYPES.BLAST_FURNACE];
        switch (type) {
            case RESOURCE_TYPES.IRON:
                if (!$ironSmeltersActivated) return;
                for (const type in IRON_SMELTER_INPUTS) {
                    if (
                        !hasEnoughInputResource(
                            ironSmelterCount,
                            IRON_SMELTER_INPUTS[type],
                            type
                        )
                    )
                        return;
                }
                const ironSmelterGeneration =
                    ironSmelterCount * IRON_SMELTER_IRON_OUTPUT;
                profitList[ironSmelterName] = ironSmelterGeneration;
                break;
            case RESOURCE_TYPES.STEEL:
                if (!$blastFurnacesActivated) return;
                for (const type in BLAST_FURNACE_INPUTS) {
                    if (
                        !hasEnoughInputResource(
                            blastFurnaceCount,
                            BLAST_FURNACE_INPUTS[type],
                            type
                        )
                    )
                        return;
                }
                const blastFurnaceGeneration =
                    blastFurnaceCount * BLAST_FURNACE_STEEL_OUTPUT;
                profitList[blastFurnaceName] = blastFurnaceGeneration;
                break;
            default:
                return;
        }
    };

    const getResourceConsumptionForProfitList = (
        profitList: Record<string, number>,
        type: string
    ) => {
        const workshopCount = $resources[RESOURCE_TYPES.WORKSHOP].value;
        const ironSmelterCount = $resources[RESOURCE_TYPES.IRON_SMELTER].value;
        const blastFurnaceCount =
            $resources[RESOURCE_TYPES.BLAST_FURNACE].value;
        const workshopName = RESOURCE_NAMES[RESOURCE_TYPES.WORKSHOP];
        const ironSmelterName = RESOURCE_NAMES[RESOURCE_TYPES.IRON_SMELTER];
        const blastFurnaceName = RESOURCE_NAMES[RESOURCE_TYPES.BLAST_FURNACE];
        switch (type) {
            case RESOURCE_TYPES.RAW_ORE: {
                const ironSmelterConsumption =
                    ironSmelterCount * IRON_SMELTER_ORE_INPUT;
                if ($ironSmeltersActivated) {
                    profitList[ironSmelterName] = -1 * ironSmelterConsumption;
                }
                break;
            }
            case RESOURCE_TYPES.COAL: {
                const ironSmelterConsumption =
                    ironSmelterCount * IRON_SMELTER_COAL_INPUT;
                const blastFurnaceConsumption =
                    blastFurnaceCount * BLAST_FURNACE_COAL_INPUT;
                if ($ironSmeltersActivated) {
                    profitList[ironSmelterName] = -1 * ironSmelterConsumption;
                }
                if ($blastFurnacesActivated) {
                    profitList[blastFurnaceName] = -1 * blastFurnaceConsumption;
                }
                break;
            }
            case RESOURCE_TYPES.IRON: {
                const blastFurnaceConsumption =
                    blastFurnaceCount * BLAST_FURNACE_IRON_INPUT;
                if ($blastFurnacesActivated) {
                    profitList[blastFurnaceName] = -1 * blastFurnaceConsumption;
                }
                break;
            }
            default:
                return;
        }
        return;
    };

    let generationRate: Element;
    let isHovering = false;
    const showInfoBox = () => {
        if (!resource.displayGenerationRate) return;
        const resourceList = getProfitList();
        let hasNonZeroValue = false;
        for (const type in resourceList) {
            if (resourceList[type] !== 0) {
                hasNonZeroValue = true;
                break;
            }
        }
        if (!hasNonZeroValue) return;
        resourceProfitsAndLosses.set(getProfitList());
        displayResourceInfoBox.set(true);
        resourceName.set(RESOURCE_NAMES[type]);
        const bounds = generationRate.getBoundingClientRect();
        rowPositionX.set(bounds.left);
        rowPositionY.set(bounds.top + bounds.height / 2);
        isHovering = true;
    };
    const hideInfoBox = () => {
        displayResourceInfoBox.set(false);
        isHovering = false;
    };
    onDestroy(() => {
        hideInfoBox();
    });
</script>

<tr>
    <td class="font-resource">
        {RESOURCE_NAMES[type]}
    </td>
    {#if resource.displayGenerationRate}
        <td class="font-resource">
            {resourceParser(resource.value)}/{resourceParser(resource.limit)}
        </td>
        <td
            bind:this={generationRate}
            on:mouseenter={showInfoBox}
            on:mouseleave={hideInfoBox}
            class="font-resource 
                {isHovering ? 'font-bold' : ''} 
                {redText(type) ? 'text-red-500' : ''}"
        >
            {formattedGenerationRate}
        </td>
    {:else}
        <td class="font-resource">
            {resource.value}
        </td>
    {/if}
</tr>

<style>
    td {
        font-size: 17px;
    }
</style>
