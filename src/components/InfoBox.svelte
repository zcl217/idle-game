<script lang="ts">
    import {
        displayInfoBox,
        buttonType,
        buttonPositionX,
        buttonPositionY,
    } from "../store/infoBox.js";
    import { resources, resourceCosts } from "../store/resources";
    import { infoBoxes } from "../constants/infoBoxes";
    import { buttonTypeToResourceType } from "../constants/buttons";
    import { resourceParser } from '../utils/helpers'

    let infoBox: any;
    console.log($resourceCosts);
    $: infoBoxBounds = infoBox?.getBoundingClientRect();
    $: y = $buttonPositionY - infoBoxBounds?.height / 2;
    $: x = $buttonPositionX - infoBoxBounds?.width - 10;
    $: resourceType = buttonTypeToResourceType[$buttonType];
    $: costs = $resourceCosts[resourceType] ?? [];

    function hasEnoughResources(resourceType, cost) {
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
            <p>{(infoBoxes[$buttonType] ?? {}).title}</p>
            <hr class="-mx-2" />
            <p>{(infoBoxes[$buttonType] ?? {}).text}</p>
            {#if costs.length > 0}
                <p class="my-3"><u> Cost </u></p>
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
