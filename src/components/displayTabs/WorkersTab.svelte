<script lang="ts">
    import { resources } from "~/store/resources";
    import WorkerCountButtons from "../WorkerCountButtons.svelte";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import { workers } from "~/store/workers";
    import { WORKER_TYPES } from "~/constants/workers/workerTypes";
    import {
        blastFurnacesActivated,
        insufficientFood,
        ironSmeltersActivated,
        researchedSciences,
    } from "~/store/gameState";
    import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
    import {
        BLAST_FURNACE_COAL_INPUT,
        BLAST_FURNACE_IRON_INPUT,
        BLAST_FURNACE_STEEL_OUTPUT,
        IRON_SMELTER_COAL_INPUT,
        IRON_SMELTER_IRON_OUTPUT,
        IRON_SMELTER_ORE_INPUT,
        WORKER_FOOD_CONSUMPTION,
    } from "~/constants/gameState";
    import { FOOTPAD } from "~/constants/military/units/humans";
    import { set } from "lodash";

    let ironSmelterInput = $ironSmeltersActivated ? "on" : "off";
    let ironSmelterCount = 0;
    let blastFurnaceInput = $blastFurnacesActivated ? "on" : "off";
    let blastFurnaceCount = 0;
    $: ironSmelterCount = $resources[RESOURCE_TYPES.IRON_SMELTER].value;
    $: blastFurnaceCount = $resources[RESOURCE_TYPES.BLAST_FURNACE].value;
    $: maxWorkers = $resources[RESOURCE_TYPES.HOMES].value;
    $: availableWorkers = $workers[WORKER_TYPES.UNASSIGNED].value;

    const toggleIronSmelter = () => {
        ironSmelterInput === "on"
            ? ironSmeltersActivated.set(true)
            : ironSmeltersActivated.set(false);
    };
    const toggleBlastFurnace = () => {
        blastFurnaceInput === "on"
            ? blastFurnacesActivated.set(true)
            : blastFurnacesActivated.set(false);
    };

    const handleWorkerChange = (workerType: string, operation: string) => {
        if (operation === "increment") {
            if (availableWorkers === 0) return;
            workers.increment(workerType);
        } else {
            workers.decrement(workerType);
        }
    };
</script>

<div class="w-3/5 w-min-670px rpgui-container">
    <div>
        <h1>
            Available Workers: {availableWorkers} / {maxWorkers}
        </h1>
    </div>
    <!-- {#if $insufficientFood}
        <div class="text-red-900">
            Warning: insufficient food. <br /> Workers are producing at 50% efficiency
        </div>
    {/if} -->
    <p class="mb-10 text-center">
        Workers currently consuming {(maxWorkers - availableWorkers) *
            WORKER_FOOD_CONSUMPTION} food per second
    </p>
    <div class="flex justify-between w-11/12 my-2 text-xl">
        <span> Farmers: {$workers[WORKER_TYPES.FARMER].value} </span>
        <WorkerCountButtons
            on:increment={() => {
                handleWorkerChange(WORKER_TYPES.FARMER, "increment");
            }}
            on:decrement={() => {
                handleWorkerChange(WORKER_TYPES.FARMER, "decrement");
            }}
        />
    </div>
    <div class="flex justify-between w-11/12 my-2 text-xl">
        <span> Woodcutters: {$workers[WORKER_TYPES.WOODCUTTER].value} </span>
        <WorkerCountButtons
            on:increment={() => {
                handleWorkerChange(WORKER_TYPES.WOODCUTTER, "increment");
            }}
            on:decrement={() => {
                handleWorkerChange(WORKER_TYPES.WOODCUTTER, "decrement");
            }}
        />
    </div>
    {#if $resources[RESOURCE_TYPES.LIBRARIES].value > 0}
        <div class="flex justify-between w-11/12 my-2 text-xl">
            <span> Scholars: {$workers[WORKER_TYPES.SCHOLAR].value} </span>
            <WorkerCountButtons
                on:increment={() => {
                    handleWorkerChange(WORKER_TYPES.SCHOLAR, "increment");
                }}
                on:decrement={() => {
                    handleWorkerChange(WORKER_TYPES.SCHOLAR, "decrement");
                }}
            />
        </div>
    {/if}
    {#if $researchedSciences.has(SCIENCE_BUTTON_TYPES.ORE_MINING)}
        <div class="flex justify-between w-11/12 my-2 text-xl">
            <span> Miners: {$workers[WORKER_TYPES.MINER].value} </span>
            <WorkerCountButtons
                on:increment={() => {
                    handleWorkerChange(WORKER_TYPES.MINER, "increment");
                }}
                on:decrement={() => {
                    handleWorkerChange(WORKER_TYPES.MINER, "decrement");
                }}
            />
        </div>
    {/if}
    {#if ironSmelterCount > 0}
        <div class="flex flex-row items-center my-5">
            <div class="flex flex-row items-center justify-between w-380px">
                <div class="text-xl">Iron Smelters</div>
                <div class="flex flex-col ml-5">
                    <input
                        class="rpgui-radio golden"
                        id="ironSmelterOff"
                        type="radio"
                        checked
                        bind:group={ironSmelterInput}
                        on:change={toggleIronSmelter}
                        name="ironSmelterOff"
                        value="off"
                    /><label for="ironSmelterOff"> Off </label>
                    <input
                        class="rpgui-radio golden"
                        id="ironSmelterOn"
                        type="radio"
                        bind:group={ironSmelterInput}
                        on:change={toggleIronSmelter}
                        name="ironSmelterOn"
                        value="on"
                    /><label for="ironSmelterOn"> On </label>
                </div>
            </div>
            <div class="flex flex-col ml-20">
                <p>Input:</p>
                <p>Raw ore {ironSmelterCount * IRON_SMELTER_ORE_INPUT}/s</p>
                <p>Coal {ironSmelterCount * IRON_SMELTER_COAL_INPUT}/s</p>
                <p class="mt-5">Output:</p>
                <p>Iron {ironSmelterCount * IRON_SMELTER_IRON_OUTPUT}/s</p>
            </div>
        </div>
    {/if}
    {#if blastFurnaceCount > 0}
        <div class="flex flex-row items-center">
            <div class="flex flex-row items-center justify-between w-380px">
                <div class="text-xl">Blast Furnaces</div>
                <div class="flex flex-col ml-5">
                    <input
                        class="rpgui-radio golden"
                        id="blastFurnaceOff"
                        type="radio"
                        checked
                        bind:group={blastFurnaceInput}
                        on:change={toggleBlastFurnace}
                        name="blastFurnaceOff"
                        value="off"
                    /><label for="blastFurnaceOff"> Off </label>
                    <input
                        class="rpgui-radio golden"
                        id="blastFurnaceOn"
                        type="radio"
                        bind:group={blastFurnaceInput}
                        on:change={toggleBlastFurnace}
                        name="blastFurnaceOn"
                        value="on"
                    /><label for="blastFurnaceOn"> On </label>
                </div>
            </div>
            <div class="flex flex-col ml-20">
                <p>Input:</p>
                <p>Iron ore {blastFurnaceCount * BLAST_FURNACE_IRON_INPUT}/s</p>
                <p>Coal {blastFurnaceCount * BLAST_FURNACE_COAL_INPUT}/s</p>
                <p class="mt-5">Output:</p>
                <p>Steel {blastFurnaceCount * BLAST_FURNACE_STEEL_OUTPUT}/s</p>
            </div>
        </div>
    {/if}
</div>

<style>
    .w-min-670px {
        min-width: 670px;
    }
    .w-380px {
        width: 380px;
    }
</style>
