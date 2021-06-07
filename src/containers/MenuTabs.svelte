<script lang="ts">
    import { TABS } from "../constants/buttons/buttons";
    import { createEventDispatcher } from "svelte";
    import { resources } from "~/store/resources";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import { researchedSciences } from "~/store/gameState";
    import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";

    export let currentTab: string = TABS.MAIN_2,
        displayMain1: boolean = true;
    const dispatch = createEventDispatcher();
    let displayScienceTab = false;
    let displayMilitaryTabs = false;
    $: {
        if (!displayScienceTab) {
            displayScienceTab = $resources[RESOURCE_TYPES.LIBRARIES].value > 0;
        }
    }
    $: {
        if (!displayMilitaryTabs) {
            displayMilitaryTabs = $researchedSciences.has(
                SCIENCE_BUTTON_TYPES.BARRACKS
            );
        }
    }
    const toggleTab = (tab: string) => {
        dispatch("toggleTab", tab);
        currentTab = tab;
    };
</script>

<div class="flex justify-around w-full mt-5 -mb-3">
    {#if displayMain1}
        <button
            class="flex rpgui-button tabWidth {currentTab === TABS.MAIN_1
                ? 'selected'
                : ''}"
            type="button"
            on:click={() => {
                toggleTab(TABS.MAIN_1);
            }}
        >
            <span class="w-8 h-8 m-auto bg-smallBase" />
        </button>
    {:else}
        <button
            class="flex rpgui-button tabWidth {currentTab === TABS.MAIN_2
                ? 'selected'
                : ''}"
            type="button"
            on:click={() => {
                toggleTab(TABS.MAIN_2);
            }}
        >
            <span class="w-8 h-8 m-auto bg-base" />
        </button>
        <button
            class="flex rpgui-button tabWidth {currentTab === TABS.WORKERS
                ? 'selected'
                : ''}"
            type="button"
            on:click={() => {
                toggleTab(TABS.WORKERS);
            }}
        >
            <span class="w-8 h-8 m-auto bg-worker" />
        </button>
    {/if}
    {#if displayScienceTab}
        <button
            class="flex rpgui-button tabWidth {currentTab === TABS.SCIENCE
                ? 'selected'
                : ''}"
            type="button"
            on:click={() => {
                toggleTab(TABS.SCIENCE);
            }}
        >
            <span class="w-8 h-8 m-auto bg-science" />
        </button>
    {/if}
    {#if displayMilitaryTabs}
        <button
            class="flex rpgui-button tabWidth {currentTab === TABS.BARRACKS
                ? 'selected'
                : ''}"
            type="button"
            on:click={() => {
                toggleTab(TABS.BARRACKS);
            }}
        >
            <span class="w-8 h-8 m-auto bg-barracks" />
        </button>

        <button
            class="flex rpgui-button tabWidth {currentTab === TABS.EXPEDITION
                ? 'selected'
                : ''}"
            type="button"
            on:click={() => {
                toggleTab(TABS.EXPEDITION);
            }}
        >
            <span class="w-8 h-8 m-auto bg-expedition" />
        </button>
    {/if}
    <button
        class="flex rpgui-button tabWidth {currentTab === TABS.SAVE
            ? 'selected'
            : ''}"
        type="button"
        on:click={() => toggleTab(TABS.SAVE)}
    >
        <span class="w-8 h-8 m-auto bg-save" />
    </button>
</div>

<style>
    .tabWidth {
        width: 140px;
    }
    .selected {
        background-image: url("../img/button-down.png");
    }
</style>
