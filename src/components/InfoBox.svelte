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
        EMPIRE_INFO_BOXES,
        MILITARY_INFO_BOXES,
        OTHER_INFO_BOXES,
        SCIENCE_INFO_BOXES,
    } from "../constants/infoBoxes";
    import { resourceParser } from "../utils/helpers";
    import { empireButtonCosts } from "~/store/buttonCosts";
    import type { IButtonCost } from "~/interfaces/buttons";
    import { BUTTON_CATEGORIES } from "~/constants/buttons/buttons";

    let infoBox: any,
        costs: IButtonCost[] = [],
        title: string,
        text: string;

    $: infoBoxBounds = infoBox?.getBoundingClientRect();
    $: y = $buttonPositionY - infoBoxBounds?.height / 2;
    $: x = $buttonPositionX - infoBoxBounds?.width - 10;
    $: {
        switch ($buttonCategory) {
            case BUTTON_CATEGORIES.EMPIRE:
                costs = $empireButtonCosts[$buttonType];
                title = EMPIRE_INFO_BOXES[$buttonType].title;
                text = EMPIRE_INFO_BOXES[$buttonType].text;
                break;
            case BUTTON_CATEGORIES.SCIENCE:
                title = SCIENCE_INFO_BOXES[$buttonType].title;
                text = SCIENCE_INFO_BOXES[$buttonType].text;
                break;
            case BUTTON_CATEGORIES.MILITARY:
                title = MILITARY_INFO_BOXES[$buttonType].title;
                text = MILITARY_INFO_BOXES[$buttonType].text;
                break;
            case BUTTON_CATEGORIES.OTHER:
                title = OTHER_INFO_BOXES[$buttonType].title;
                text = OTHER_INFO_BOXES[$buttonType].text;
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
