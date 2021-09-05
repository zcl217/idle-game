<script lang="ts">
    import { onDestroy } from "svelte";
    import { get } from "svelte/store";
    import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
    import {
        TAVERN_FOOD_CONSUMPTION,
        WORKER_FOOD_CONSUMPTION,
        WORKER_TAXATION_BONUS,
    } from "~/constants/gameState";
    import {
        INDUSTRY_BUILDING_STORE_MAP,
        INDUSTRY_INPUTS_MAP,
        RESOURCE_INPUT_TO_INDUSTRY_BUILDINGS_MAP,
        RESOURCE_TO_RESOURCE_OUTPUT_MAP,
        RESOURCE_OUTPUT_TO_INDUSTRY_BUILDING_MAP,
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
    import { researchedSciences } from "~/store/gameState";
    import {
        displayResourceInfoBox,
        resourceName,
        resourceGenerationList,
        rowPositionX,
        rowPositionY,
    } from "~/store/infoBox";
    import {
        insufficientFood,
        resources,
        resourcesFromExpeditions,
    } from "~/store/resources";
    import { totalWorkers, workers } from "~/store/workers";
    import {
        calculateGenerationRate,
        calculateResourceMultiplier,
    } from "~/utils/resourceGeneration";
    import { resourceParser } from "~/utils/resourceHelpers";

    export let resource: IResource, type: string;
    let formattedGenerationRate = "";
    $: {
        $resources;
        formattedGenerationRate = formatGenerationRate(type);
    }

    const formatGenerationRate = (type: string): string => {
        let generationRate = calculateGenerationRate(
            type,
            $resources,
            $workers,
            $insufficientFood,
            process.env.isDev
        );
        generationRate -= getIndustryConsumption(type);
        generationRate += getIndustryGeneration(type);
        const prefix = generationRate >= 0 ? "+" : "";
        const formattedGenerationRate = resourceParser(generationRate);
        return `${prefix}${formattedGenerationRate}/s`;
    };

    const getIndustryConsumption = (resourceType: string): number => {
        let total = 0;
        const industryBuildingList =
            RESOURCE_INPUT_TO_INDUSTRY_BUILDINGS_MAP[resourceType];
        if (!industryBuildingList) return 0;
        for (let industryBuilding of industryBuildingList) {
            const industryBuildingActivated =
                INDUSTRY_BUILDING_STORE_MAP[industryBuilding];
            if (!get(industryBuildingActivated)) continue;
            const industryInputs = INDUSTRY_INPUTS_MAP[industryBuilding];
            const buildingCount = $resources[industryBuilding].value;
            total += buildingCount * industryInputs[resourceType];
        }
        return total;
    };

    const getIndustryGeneration = (resourceType: string) => {
        const industryBuilding =
            RESOURCE_OUTPUT_TO_INDUSTRY_BUILDING_MAP[resourceType];
        if (!industryBuilding) return 0;
        const industryBuildingActivated =
            INDUSTRY_BUILDING_STORE_MAP[industryBuilding];
        if (!get(industryBuildingActivated)) return 0;
        const buildingCount = $resources[industryBuilding].value;
        return buildingCount * RESOURCE_TO_RESOURCE_OUTPUT_MAP[resourceType];
    };

    // so this list here is creating the info box resource generation rate for every single resource.
    // ideally, we should split it up somehow so that each resource doesn't have to run through
    // resource-specific checks (ex. only gold needs to check taxation, etc)
    const getGenerationList = (): Record<string, number> => {
        const generationList: Record<string, number> = {};
        const multiplier = calculateResourceMultiplier(type, $resources);
        // profits
        const generator = RESOURCE_GENERATOR_MAP[type];
        if (generator) {
            const resourcesFromBuildings =
                $resources[generator].value *
                $resources[generator].generationValue;

            generationList[RESOURCE_NAMES[generator]] =
                resourcesFromBuildings * multiplier;
        }
        const workerType = WORKER_GENERATOR_MAP[type];
        if (workerType) {
            let resourcesFromWorkers =
                $workers[workerType].value *
                $workers[workerType].generationValue;
            if ($insufficientFood) resourcesFromWorkers *= 0.5;
            generationList[workerType] = resourcesFromWorkers * multiplier;
        }
        const expeditionProfit = $resourcesFromExpeditions[type];
        if (expeditionProfit > 0) {
            generationList["expeditions"] = expeditionProfit;
        }
        if (
            type === RESOURCE_TYPES.GOLD &&
            $researchedSciences.has(SCIENCE_BUTTON_TYPES.TAXATION)
        ) {
            generationList["taxation"] = $totalWorkers * WORKER_TAXATION_BONUS;
        }
        getIndustryGenerationForInfoBoxList(generationList, type);

        // losses
        switch (type) {
            case RESOURCE_TYPES.FOOD:
                const maxWorkers = $totalWorkers;
                const assignedWorkers =
                    maxWorkers - $workers[WORKER_TYPES.UNASSIGNED].value;
                const foodConsumption =
                    assignedWorkers * WORKER_FOOD_CONSUMPTION;
                generationList["workers"] = -1 * foodConsumption;
                const tavernConsumption =
                    $resources[RESOURCE_TYPES.TAVERN].value *
                    TAVERN_FOOD_CONSUMPTION;
                if (tavernConsumption !== 0)
                    generationList["taverns"] = -1 * tavernConsumption;
                break;
            case RESOURCE_TYPES.COAL:
                const mansions = $resources[RESOURCE_TYPES.MANSION].value;
                generationList["mansions"] = -1 * mansions;
                break;
            default:
                break;
        }
        getIndustryConsumptionForInfoBoxList(generationList, type);
        return generationList;
    };

    const getIndustryConsumptionForInfoBoxList = (
        generationList: Record<string, number>,
        resourceType: string
    ): number => {
        const industryBuildingList =
            RESOURCE_INPUT_TO_INDUSTRY_BUILDINGS_MAP[resourceType];
        if (!industryBuildingList) return;
        for (let industryBuilding of industryBuildingList) {
            const industryBuildingActivated =
                INDUSTRY_BUILDING_STORE_MAP[industryBuilding];
            if (!get(industryBuildingActivated)) continue;
            const industryInputs = INDUSTRY_INPUTS_MAP[industryBuilding];
            const buildingCount = $resources[industryBuilding].value;
            const consumption = buildingCount * industryInputs[resourceType];
            generationList[RESOURCE_NAMES[industryBuilding]] = -1 * consumption;
        }
    };

    const getIndustryGenerationForInfoBoxList = (
        generationList: Record<string, number>,
        resourceType: string
    ) => {
        const industryBuilding =
            RESOURCE_OUTPUT_TO_INDUSTRY_BUILDING_MAP[resourceType];
        if (!industryBuilding) return;
        const industryBuildingActivated =
            INDUSTRY_BUILDING_STORE_MAP[industryBuilding];
        if (!get(industryBuildingActivated)) return;
        const buildingCount = $resources[industryBuilding].value;
        const generation =
            buildingCount * RESOURCE_TO_RESOURCE_OUTPUT_MAP[resourceType];
        generationList[RESOURCE_NAMES[industryBuilding]] = generation;
    };

    let generationRate: Element;
    let isHovering = false;
    const showInfoBox = () => {
        if (!resource.displayGenerationRate) return;
        const resourceList = getGenerationList();
        let hasNonZeroValue = false;
        for (const type in resourceList) {
            if (resourceList[type] !== 0) {
                hasNonZeroValue = true;
                break;
            }
        }
        if (!hasNonZeroValue) return;
        resourceGenerationList.set(resourceList);
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
    $: isTextRed = type === RESOURCE_TYPES.FOOD && $insufficientFood;
</script>

<tr>
    <td class="font-resource">
        {RESOURCE_NAMES[type]}
    </td>
    {#if resource.displayGenerationRate}
        <td class="pl-2 font-resource">
            {resourceParser(resource.value)}/{resourceParser(resource.limit)}
        </td>
        <td
            bind:this={generationRate}
            on:mouseenter={showInfoBox}
            on:mouseleave={hideInfoBox}
            class="font-resource
                {isHovering ? 'font-bold' : ''} 
                {isTextRed ? 'text-red-500' : ''}"
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
