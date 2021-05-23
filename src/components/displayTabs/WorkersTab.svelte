<script lang="ts">
    import { resources } from "~/store/resources.js";
    import WorkerCountButtons from "../WorkerCountButtons.svelte";
    import { resourceTypes } from "~/constants/resourceTypes";
    import { workers } from "~/store/workers";
    import { workerTypes } from "~/constants/workerTypes";

    $: assignedWorkers = () => {
        let sum = 0;
        for (const [key, worker] of Object.entries($workers)) {
            sum += (worker as any).value;
        }
        return sum;
    }
    $: maxWorkers = $resources[resourceTypes.HOMES].value;
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
            <span> Farmers: {$workers[workerTypes.FARMER].value} </span>
            <WorkerCountButtons
                on:increment={() => {
                    handleWorkerChange(workerTypes.FARMER, "increment");
                }}
                on:decrement={() => {
                    handleWorkerChange(workerTypes.FARMER, "decrement");
                }}
            />
        </div>
    {/if}
    {#if true}
        <div class="flex justify-between w-11/12 my-2 text-xl">
            <span> Woodcutters: {$workers[workerTypes.WOODCUTTER].value} </span>
            <WorkerCountButtons
                on:increment={() => {
                    handleWorkerChange(workerTypes.WOODCUTTER, "increment");
                }}
                on:decrement={() => {
                    handleWorkerChange(workerTypes.WOODCUTTER, "decrement");
                }}
            />
        </div>
    {/if}
    {#if true}
        <div class="flex justify-between w-11/12 my-2 text-xl">
            <span> Scholars: {$workers[workerTypes.SCHOLAR].value} </span>
            <WorkerCountButtons
                on:increment={() => {
                    handleWorkerChange(workerTypes.SCHOLAR, "increment");
                }}
                on:decrement={() => {
                    handleWorkerChange(workerTypes.SCHOLAR, "decrement");
                }}
            />
        </div>
    {/if}
    {#if true}
        <div class="flex justify-between w-11/12 my-2 text-xl">
            <span> Miners: {$workers[workerTypes.MINER].value} </span>
            <WorkerCountButtons
                on:increment={() => {
                    handleWorkerChange(workerTypes.MINER, "increment");
                }}
                on:decrement={() => {
                    handleWorkerChange(workerTypes.MINER, "decrement");
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