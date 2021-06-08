<script lang="ts">
    import { resources } from "./store/resources";
    import { workers } from "./store/workers";
    import {
        RESOURCE_TYPES,
        GENERATABLE_RESOURCES,
    } from "./constants/resources/resourceTypes";
    import { calculateGenerationRate } from "./utils/resourceGeneration";
    import {
        blastFurnacesActivated,
        insufficientFood,
        ironSmeltersActivated,
    } from "./store/gameState";
    import {
        BLAST_FURNACE_COAL_INPUT,
        BLAST_FURNACE_IRON_INPUT,
        BLAST_FURNACE_STEEL_OUTPUT,
        IRON_SMELTER_COAL_INPUT,
        IRON_SMELTER_IRON_OUTPUT,
        IRON_SMELTER_ORE_INPUT,
    } from "./constants/gameState";

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
        if ($ironSmeltersActivated) handleIronGeneration(secondsElapsed);
        if ($blastFurnacesActivated) handleSteelGeneration(secondsElapsed);
        for (let resource of GENERATABLE_RESOURCES)
            handleResourceGeneration(secondsElapsed, resource);
    };

    const handleResourceGeneration = (secondsElapsed: number, type: string) => {
        const generationRate = calculateGenerationRate(
            type,
            $resources,
            $workers,
            $insufficientFood
        );
        if (type === RESOURCE_TYPES.FOOD) {
            const hasFoodShortage =
                $resources[type].value === 0 &&
                generationRate < 0;
            insufficientFood.set(hasFoodShortage);
        }
        if (generationRate < 0 && $resources[type].value === 0) return;
        //nsole.log($resources[type])
        const newValue =
            $resources[type].value + generationRate * secondsElapsed;
        resources.updateResourceValue(type, newValue);
    };

    const handleIronGeneration = (secondsElapsed: number) => {
        const ironSmelterCount = $resources[RESOURCE_TYPES.IRON_SMELTER].value;
        if (ironSmelterCount === 0) return;
        const ore = RESOURCE_TYPES.RAW_ORE;
        const coal = RESOURCE_TYPES.COAL;
        const iron = RESOURCE_TYPES.IRON;
        const oreRequired =
            ironSmelterCount * IRON_SMELTER_ORE_INPUT * secondsElapsed;
        if ($resources[ore].value < oreRequired) return;
        const coalRequired =
            ironSmelterCount * IRON_SMELTER_COAL_INPUT * secondsElapsed;
        if ($resources[coal].value < coalRequired) return;
        let newOreValue = $resources[ore].value - oreRequired;
        resources.updateResourceValue(ore, newOreValue);
        let newCoalValue = $resources[coal].value - coalRequired;
        resources.updateResourceValue(coal, newCoalValue);
        const newIronValue =
            $resources[iron].value +
            ironSmelterCount * IRON_SMELTER_IRON_OUTPUT * secondsElapsed;
        resources.updateResourceValue(iron, newIronValue);
    };

    const handleSteelGeneration = (secondsElapsed: number) => {
        const blastFurnaceCount =
            $resources[RESOURCE_TYPES.BLAST_FURNACE].value;
        if (blastFurnaceCount === 0) return;
        const iron = RESOURCE_TYPES.IRON;
        const coal = RESOURCE_TYPES.COAL;
        const steel = RESOURCE_TYPES.STEEL;
        const ironRequired =
            blastFurnaceCount * BLAST_FURNACE_IRON_INPUT * secondsElapsed;
        if ($resources[iron].value < ironRequired) return;
        const coalRequired =
            blastFurnaceCount * BLAST_FURNACE_COAL_INPUT * secondsElapsed;
        if ($resources[coal].value < coalRequired) return;
        let newIronValue = $resources[iron].value - ironRequired;
        resources.updateResourceValue(iron, newIronValue);
        let newCoalValue = $resources[coal].value - coalRequired;
        resources.updateResourceValue(coal, newCoalValue);

        const newSteelValue =
            $resources[steel].value +
            blastFurnaceCount * BLAST_FURNACE_STEEL_OUTPUT * secondsElapsed;
        resources.updateResourceValue(steel, newSteelValue);
    };

    const processEvents = (secondsElapsed: number) => {};

    setInterval(gameLoop, 1000);
    // document.addEventListener("DOMContentLoaded", function (event) {
    // 	setInterval(gameLoop, 1000);
    // });
</script>
