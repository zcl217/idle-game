<script lang="ts">
    import { resourceParser } from "~/utils/resourceHelpers";
    import {
        rowPositionY,
        rowPositionX,
        displayResourceInfoBox,
        resourceProfitsAndLosses,
        resourceName,
    } from "../store/infoBox";

    let infoBox: any;
    $: infoBoxBounds = infoBox?.getBoundingClientRect();
    $: y = $rowPositionY - infoBoxBounds?.height / 2;
    $: x = $rowPositionX + 70;

    const formatGenerationRate = (generationRate: number) => {
        const prefix = generationRate >= 0 ? "+" : "";
        const formattedGenerationRate = resourceParser(generationRate);
        return `${prefix}${formattedGenerationRate}/s`;
    };
</script>

{#if $displayResourceInfoBox}
    <div
        class="absolute border-4 rpgui-container framed-grey max-w-300px"
        style="top: {y}px; margin-left: {x}px"
        bind:this={infoBox}
    >
        <div class="flex flex-col">
            <p class="text-center">{$resourceName}</p>
            <hr class="-mx-2" />
            {#each Object.entries($resourceProfitsAndLosses) as [name, value]}
                {#if value !== 0}
                    <p class="text-left">
                        {name}:
                        <span class={value > 0 ? "text-green" : "text-red"}>
                            {formatGenerationRate(value)}
                        </span>
                    </p>
                {/if}
            {/each}
        </div>
    </div>
{/if}

<style>
    .max-w-300px {
        max-width: 300px;
    }
    .text-green {
        color: rgb(22, 224, 22);
    }
    .text-red {
        color: red;
    }
</style>
