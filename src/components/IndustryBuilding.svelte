<script lang="ts">
    import { INDUSTRY_BUILDING_TITLES } from "~/constants/resources/industry";

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
    let title = INDUSTRY_BUILDING_TITLES[industryBuilding];
    let radioInput = activated ? "on" : "off";
    let inputList = getIndustryInputList(industryBuilding);
    let outputList = getIndustryOutputList(industryBuilding);
    $: buildingCount = $resources[industryBuilding].value;
</script>

<div class="container flex flex-row p-2 mb-4 bg">
    <p class="flex items-center text-xl flex-25">{title}</p>
    <div class="flex flex-row flex-grow flex-25">
        <div class="flex flex-col mr-10">
            <p class="industry-text">Input:</p>
            {#each Object.entries(inputList) as [key, value]}
                <p class="industry-text">
                    {RESOURCE_NAMES[key]}
                    {buildingCount * value}/s
                </p>
            {/each}
        </div>
    </div>

    <div class="flex flex-row flex-grow flex-25">
        <div class="flex flex-col">
            <p class="industry-text">Output:</p>
            {#each Object.entries(outputList) as [key, value]}
                <p class="industry-text">
                    {RESOURCE_NAMES[key]}
                    {buildingCount * value}/s
                </p>
            {/each}
        </div>
    </div>

    <div class="flex flex-row flex-25 justify-evenly">
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
    .flex-25 {
        flex: 25%;
    }
    .flex-50 {
        flex: 50%;
    }
    .bg {
        background-color: rgba(133, 76, 48, 0.5);
    }

    .p-2 {
        padding: 8px;
    }

    .container p {
        font-size: 12px;
    }
    .mr-10 {
        margin-right: 2.5rem;
    }
    .my-4 {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .w-1\/2 {
        width: 50%;
    }
    .justify-evenly {
        justify-content: space-evenly;
    }
</style>
