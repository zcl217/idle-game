<script lang="ts">
    import { resources } from "~/store/resources";
    import WorkerCountButtons from "../WorkerCountButtons.svelte";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import { totalWorkers, workers } from "~/store/workers";
    import { WORKER_TYPES } from "~/constants/workers/workerTypes";
    import { researchedSciences } from "~/store/gameState";
    import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
    import { WORKER_FOOD_CONSUMPTION } from "~/constants/gameState";
    import { INITIAL_WORKER_STATE } from "~/constants/workers/workerStates";
    import { capitalize } from "lodash";

    $: maxWorkers = $totalWorkers;
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

    const displayWorkerType = (workerType: string): boolean => {
        switch (workerType) {
            case WORKER_TYPES.FARMER:
            case WORKER_TYPES.WOODCUTTER:
                return true;
            case WORKER_TYPES.SCHOLAR:
                return $resources[RESOURCE_TYPES.ATHENAEUM].value > 0;
            case WORKER_TYPES.HUNTER:
                return $researchedSciences.has(SCIENCE_BUTTON_TYPES.HUNTERS);
            case WORKER_TYPES.MINER:
                return $researchedSciences.has(SCIENCE_BUTTON_TYPES.ORE_MINING);
            case WORKER_TYPES.MITHRIL_MINER:
                return $researchedSciences.has(SCIENCE_BUTTON_TYPES.MITHRIL);
            case WORKER_TYPES.ADAMANTITE_MINER:
                return $researchedSciences.has(SCIENCE_BUTTON_TYPES.ADAMANTITE);
            default:
                return false;
        }
    };

    const capitalizeAll = (value: string) => {
        const allWords = value.split(' ');
        const capitalized = allWords.map(word => capitalize(word));
        return capitalized.join(' ');
    }
</script>

<div>
    <h1 class="text-left">
        Available Workers: {availableWorkers} / {maxWorkers}
    </h1>
</div>
<!-- Worker buttons -->
<table class="text-xl text-white">
    {#each Object.entries(WORKER_TYPES) as [key, workerType]}
        {#if displayWorkerType(workerType)}
            <tr class="bg">
                <td class="px-16"><span> {$workers[workerType].value} </span></td>
                <td class="px-8"><span> {capitalizeAll(workerType)} </span></td>
                <td class="pl-8">
                    <WorkerCountButtons
                        on:increment={() => {
                            handleWorkerChange(workerType, "increment");
                        }}
                        on:decrement={() => {
                            handleWorkerChange(workerType, "decrement");
                        }}
                    />
                </td>
            </tr>
            <!-- <div class="flex justify-between w-11/12 my-2 text-xl">
            <span> Farmers: {$workers[workerType].value} </span>
            <WorkerCountButtons
                on:increment={() => {
                    handleWorkerChange(workerType, "increment");
                }}
                on:decrement={() => {
                    handleWorkerChange(workerType, "decrement");
                }}
            />
        </div> -->
        {/if}
    {/each}
</table>
<!-- Multipliers -->
<div class="flex justify-around mt-10">
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
    .px-8 {
        padding-left: 2rem;
        padding-right: 2rem;
    }
    .px-16 {
        padding-left: 4rem;
        padding-right: 4rem;
    }
    table {
        border-collapse: separate;
        border-spacing: 0 10px;
        margin: 0 auto;
    }
    .bg {
        background-color: rgba(133, 76, 48, 0.5);
    }
</style>
