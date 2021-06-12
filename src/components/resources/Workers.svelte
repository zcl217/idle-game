<script lang="ts">
    import { resources } from "~/store/resources";
    import WorkerCountButtons from "../WorkerCountButtons.svelte";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import { workers } from "~/store/workers";
    import { WORKER_TYPES } from "~/constants/workers/workerTypes";
    import { researchedSciences } from "~/store/gameState";
    import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
    import { WORKER_FOOD_CONSUMPTION } from "~/constants/gameState";
    import { INITIAL_WORKER_STATE } from "~/constants/workers/workerStates";

    $: maxWorkers = $resources[RESOURCE_TYPES.HOUSE].value;
    $: availableWorkers = $workers[WORKER_TYPES.UNASSIGNED].value;
    let workerChangeValue = 1;
    const handleWorkerChange = (workerType: string, operation: string) => {
        if (operation === "increment") {
            if (availableWorkers === 0) return;
            workers.increment(workerType, workerChangeValue);
        } else {
            workers.decrement(workerType, workerChangeValue);
        }
    };
    const clearWorkers = () => {
        workers.clearWorkers(maxWorkers);
    };
</script>

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
{#if $resources[RESOURCE_TYPES.LIBRARY].value > 0}
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
<div class="flex justify-around mt-5">
    <button
        class="rpgui-button {workerChangeValue === 1 ? 'selected' : ''}"
        on:click={() => (workerChangeValue = 1)}
    >
        x 1
    </button>
    <button
        class="rpgui-button {workerChangeValue === 5 ? 'selected' : ''}"
        on:click={() => (workerChangeValue = 5)}
    >
        x 5
    </button>
    <button
        class="rpgui-button {workerChangeValue === 10 ? 'selected' : ''}"
        on:click={() => (workerChangeValue = 10)}
    >
        x 10
    </button>
    <button
        class="rpgui-button {workerChangeValue === 100 ? 'selected' : ''}"
        on:click={() => (workerChangeValue = 100)}
    >
        x 100
    </button>
    <button class="rpgui-button" on:click={clearWorkers}> Clear all </button>
</div>

<style>
    .selected {
        background-image: url("../img/button-down.png");
    }
</style>
