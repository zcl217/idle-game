<script lang="ts">
    import {
        displayInfoBox,
        buttonType,
        buttonCategory,
        buttonPositionX,
        buttonPositionY,
    } from "../store/infoBox.js";
    import { resources } from "../store/resources";
    import {
        empireInfoBoxes,
        militaryInfoBoxes,
        otherInfoBoxes,
        scienceInfoBoxes,
    } from "../constants/infoBoxes";
    import { resourceParser } from "../utils/helpers";
    import { empireButtonCosts } from "~/store/buttonCosts";
    import type { IButtonCost } from "~/interfaces/buttons";
    import { buttonCategories } from "~/constants/buttons/buttons";

    let infoBox: any,
        costs: IButtonCost[] = [],
        title: string,
        text: string;

    $: infoBoxBounds = infoBox?.getBoundingClientRect();
    $: y = $buttonPositionY - infoBoxBounds?.height / 2;
    $: x = $buttonPositionX - infoBoxBounds?.width - 10;
    $: {
        switch ($buttonCategory) {
            case buttonCategories.EMPIRE:
                costs = $empireButtonCosts[$buttonType];
                title = empireInfoBoxes[$buttonType].title;
                text = empireInfoBoxes[$buttonType].text;
                break;
            case buttonCategories.SCIENCE:
                title = scienceInfoBoxes[$buttonType].title;
                text = scienceInfoBoxes[$buttonType].text;
                break;
            case buttonCategories.MILITARY:
                title = militaryInfoBoxes[$buttonType].title;
                text = militaryInfoBoxes[$buttonType].text;
                break;
            case buttonCategories.OTHER:
                title = otherInfoBoxes[$buttonType].title;
                text = otherInfoBoxes[$buttonType].text;
                break;
            default:
                costs = [];
                break;
        }
        if (!costs) costs = [];
    }

    function hasEnoughResources(resourceType: string, cost: number) {
        const curResourceAmount = $resources[resourceType].value;
        return curResourceAmount >= cost;
    }
</script>

{#if $displayInfoBox}
    <div
        class="absolute border-4 rpgui-container framed-grey max-w-250px"
        style="top: {y}px; margin-left: {x}px"
        bind:this={infoBox}
    >
        <div class="flex flex-col text-center">
            <p>{title}</p>
            <hr class="-mx-2" />
            <p>{text}</p>
            {#if costs.length > 0}
                <p class="my-3 underline">Cost</p>
            {/if}
            {#key $resources}
                {#each costs as obj}
                    <p class="text-left">
                        {obj.text}:
                        <span
                            class:text-red={!hasEnoughResources(
                                obj.type,
                                obj.cost
                            )}
                        >
                            {resourceParser(obj.cost)}
                        </span>
                    </p>
                {/each}
            {/key}
        </div>
    </div>
{/if}

<style>
    .max-w-250px {
        max-width: 250px;
    }

    .text-red {
        color: red;
    }
</style>
