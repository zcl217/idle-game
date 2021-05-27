<script lang="ts">
    import { resources } from "~/store/resources.js";
    import WorkerCountButtons from "../WorkerCountButtons.svelte";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import { workers } from "~/store/workers";
    import { WORKER_TYPES } from "~/constants/workers/workerTypes";

    $: assignedWorkers = () => {
        let sum = 0;
        for (const [key, worker] of Object.entries($workers)) {
            sum += (worker as any).value;
        }
        return sum;
    }
    $: maxWorkers = $resources[RESOURCE_TYPES.HOMES].value;
    $: availableWorkers = maxWorkers - assignedWorkers();

    const handleWorkerChange = (workerType: string, operation: string) => {
        if (operation === 'increment' && availableWorkers === 0) return
        if (operation === 'increment') {
            workers.increment(workerType);
        } else {
            workers.decrement(workerType);
        }
    };
</script>

<div class="w-3/5 w-min-670px rpgui-container">
    <div>
        <h1 class="text-xl">
            Available Workers: {availableWorkers} / {maxWorkers}
        </h1>
    </div>

    {#if true}
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
    {/if}
    {#if true}
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
    {/if}
    {#if true}
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
    {#if true}
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
</div>

<style>
    .w-min-670px {
        min-width: 670px;
    }
</style>