<script lang="ts">
    import { resources } from "./store/resources";
    import { workers } from "./store/workers";
    import {
        RESOURCE_TYPES,
        GENERATABLE_RESOURCES,
    } from "./constants/resources/resourceTypes";
    import { calculateGenerationRate } from "./utils/resourceGeneration";
    import { insufficientFood } from "./store/resources";
    import {
        getIndustryInputList,
        getIndustryOutputList,
    } from "./utils/resourceHelpers";
    import {
        INDUSTRY_BUILDINGS,
        INDUSTRY_BUILDING_STORE_MAP,
    } from "./constants/resources/industry";
    import { get } from "svelte/store";

    let previousTime = new Date();

    const gameLoop = () => {
        const currentTime = new Date();
        const secondsElapsed = Math.round(
            (currentTime.getTime() - previousTime.getTime()) / 1000
        );
        processResources(secondsElapsed);
        processEvents(secondsElapsed);
        previousTime = currentTime;
    };

    const processResources = (secondsElapsed: number) => {
        handleIndustryBuildings(secondsElapsed);
        for (let resource of GENERATABLE_RESOURCES)
            handleResourceGeneration(secondsElapsed, resource);
    };

    const handleResourceGeneration = (secondsElapsed: number, type: string) => {
        let generationRate = calculateGenerationRate(
            type,
            $resources,
            $workers,
            $insufficientFood,
            process.env.isDev
        );
        switch (type) {
            case RESOURCE_TYPES.FOOD:
                const hasFoodShortage =
                    $resources[type].value === 0 && generationRate < 0;
                insufficientFood.set(hasFoodShortage);
                break;
            default:
                break;
        }
        if (generationRate < 0 && $resources[type].value === 0) return;
        resources.incrementResourceValue(type, generationRate * secondsElapsed);
    };

    const handleIndustryBuildings = (secondsElapsed: number) => {
        for (const industryBuilding of INDUSTRY_BUILDINGS) {
            const industryBuildingActivated =
                INDUSTRY_BUILDING_STORE_MAP[industryBuilding];
            if (get(industryBuildingActivated)) {
                handleIndustryGeneration(industryBuilding, secondsElapsed);
            }
        }
    };

    const handleIndustryGeneration = (
        industryBuilding: string,
        secondsElapsed: number
    ) => {
        const buildingCount = $resources[industryBuilding].value;
        if (buildingCount === 0) return;
        let inputList: Record<string, number> =
            getIndustryInputList(industryBuilding);
        let outputList: Record<string, number> =
            getIndustryOutputList(industryBuilding);
        for (let [resourceType, value] of Object.entries(inputList)) {
            const inputRequired = buildingCount * value * secondsElapsed;
            if ($resources[resourceType].value < inputRequired) return;
        }
        for (let [resourceType, value] of Object.entries(inputList)) {
            const inputRequired = buildingCount * value * secondsElapsed;
            resources.decrementResourceValue(resourceType, inputRequired);
        }
        for (let [resourceType, value] of Object.entries(outputList)) {
            resources.incrementResourceValue(
                resourceType,
                buildingCount * value * secondsElapsed
            );
        }
    };

    const processEvents = (secondsElapsed: number) => {};

    setInterval(gameLoop, 1000);
    // document.addEventListener("DOMContentLoaded", function (event) {
    // 	setInterval(gameLoop, 1000);
    // });
</script>
