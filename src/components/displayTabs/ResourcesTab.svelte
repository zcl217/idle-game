<script lang="ts">
    import Workers from "../resources/Workers.svelte";
    import Industry from "../resources/Industry.svelte";
    import { researchedSciences } from "~/store/gameState";
    import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
    import { has } from "lodash";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import { obtainedResources } from "~/store/resources";
    enum TABS {
        WORKERS,
        INDUSTRY,
        MARKET,
    }
    let selectedTab = TABS.WORKERS;
    $: industryUnlocked = $obtainedResources.has(RESOURCE_TYPES.WORKSHOP);
</script>

{#if industryUnlocked}
    <div class="flex flex-row justify-around">
        <button
            class="rpgui-button {selectedTab === TABS.WORKERS
                ? 'selected'
                : ''}"
            type="button"
            on:click={() => (selectedTab = TABS.WORKERS)}
        >
            Workers
        </button>
        <button
            class="rpgui-button {selectedTab === TABS.INDUSTRY
                ? 'selected'
                : ''}"
            type="button"
            on:click={() => (selectedTab = TABS.INDUSTRY)}
        >
            Industry
        </button>
        {#if $researchedSciences.has("")}
            <button
                class="rpgui-button {selectedTab === TABS.MARKET
                    ? 'selected'
                    : ''}"
                type="button"
                on:click={() => (selectedTab = TABS.MARKET)}
            >
                Market
            </button>
        {/if}
    </div>
{/if}

<div class="mt-5 w-min-670px rpgui-container {selectedTab === TABS.INDUSTRY ? "w-full position-relative" : "w-3/5" }">
    {#if selectedTab === TABS.WORKERS}
        <Workers />
    {:else if selectedTab === TABS.INDUSTRY}
        <Industry />
    {:else}
        market
    {/if}
</div>

<style>
    .w-min-670px {
        min-width: 670px;
    }
    .selected {
        background-image: url("../img/button-down.png");
    }
    .position-relative {
        position: relative !important;
    }
</style>
