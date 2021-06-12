<script lang="ts">
    import {
        RESOURCE_NAMES,
        RESOURCE_TYPES,
    } from "~/constants/resources/resourceTypes";
    import { resources } from "~/store/resources";
    import {
        getIndustryInputList,
        getIndustryOutputList,
    } from "~/utils/resourceHelpers";

    export let industryBuilding: string, handler: Function, activated: Boolean;

    const offName = industryBuilding + "off";
    const onName = industryBuilding + "on";
    let title = "";
    let radioInput = activated ? "on" : "off";
    let inputList = getIndustryInputList(industryBuilding);
    let outputList = getIndustryOutputList(industryBuilding);
    switch (industryBuilding) {
        case RESOURCE_TYPES.IRON_SMELTER:
            title = "Iron Smelter";
            break;
        case RESOURCE_TYPES.BLAST_FURNACE:
            title = "Blast Furnace";
            break;
    }
    $: buildingCount = $resources[industryBuilding].value;
</script>

<div class="flex flex-col w-1/2 mb-10">
    <div class="text-xl text-center">{title}</div>
    <div class="flex flex-row justify-center my-5">
        <div class="flex flex-col mr-10">
            <p>Input:</p>
            {#each Object.entries(inputList) as [key, value]}
                <p>{RESOURCE_NAMES[key]} {buildingCount * value}/s</p>
            {/each}
        </div>
        <div class="flex flex-col">
            <p>Output:</p>
            {#each Object.entries(outputList) as [key, value]}
                <p>{RESOURCE_NAMES[key]} {buildingCount * value}/s</p>
            {/each}
        </div>
    </div>
    <div class="flex flex-row justify-evenly">
        <input
            class="rpgui-radio golden"
            id={offName}
            type="radio"
            checked
            bind:group={radioInput}
            on:change={() => handler(industryBuilding, false)}
            value="off"
        /><label for={offName}> Off </label>
        <input
            class="rpgui-radio golden"
            id={onName}
            type="radio"
            bind:group={radioInput}
            on:change={() => handler(industryBuilding, true)}
            value="on"
        /><label for={onName}> On </label>
    </div>
</div>

<style>
    .mr-10 {
        margin-right: 2.5rem;
    }
    .w-1\/2 {
        width: 50%;
    }
    .justify-evenly {
        justify-content: space-evenly;
    }
</style>
