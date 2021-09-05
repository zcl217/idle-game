<script lang="ts">
    import { TABS } from "../constants/buttons/buttons";
    import { createEventDispatcher } from "svelte";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import { inExpedition, researchedSciences } from "~/store/gameState";
    import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
    import { obtainedResources } from "~/store/resources";
    import { unlockedLibrary } from "~/store/library";

    export let currentTab: string = TABS.MAIN_2,
        displayMain1: boolean = true;
    const dispatch = createEventDispatcher();
    let displayIndustryTab = $obtainedResources.has(RESOURCE_TYPES.WORKSHOP);
    let displayScienceTab = $obtainedResources.has(RESOURCE_TYPES.ATHENAEUM);
    let displayLibraryTab = $unlockedLibrary;
    let displayMilitaryTabs = $researchedSciences.has(
        SCIENCE_BUTTON_TYPES.BARRACKS
    );
    $: {
        displayIndustryTab = $obtainedResources.has(RESOURCE_TYPES.WORKSHOP);
    }
    $: {
        displayScienceTab = $obtainedResources.has(RESOURCE_TYPES.ATHENAEUM);
    }
    $: {
        displayLibraryTab = $unlockedLibrary;
    }
    $: {
        displayMilitaryTabs = $researchedSciences.has(
            SCIENCE_BUTTON_TYPES.BARRACKS
        );
    }
    const toggleTab = (tab: string) => {
        dispatch("toggleTab", tab);
        currentTab = tab;
    };
</script>

<div class="flex justify-around w-full mt-5 -mb-3">
    {#if displayMain1}
        <button
            class="flex rpgui-button tab-width {currentTab === TABS.MAIN_1
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
            class="flex rpgui-button tab-width
                {currentTab === TABS.MAIN_2 ? 'selected' : ''}
                {$inExpedition ? 'disabled' : ''}
                "
            disabled={$inExpedition}
            type="button"
            on:click={() => {
                toggleTab(TABS.MAIN_2);
            }}
        >
            <span class="w-8 h-8 m-auto bg-hammer" />
        </button>
        <button
            class="flex rpgui-button tab-width 
                {currentTab === TABS.WORKERS ? 'selected' : ''}
                {$inExpedition ? 'disabled' : ''}
                "
            disabled={$inExpedition}
            type="button"
            on:click={() => {
                toggleTab(TABS.WORKERS);
            }}
        >
            <span class="w-8 h-8 m-auto bg-worker" />
        </button>
    {/if}
    {#if displayIndustryTab}
        <button
            class="flex rpgui-button tab-width 
                    {currentTab === TABS.INDUSTRY ? 'selected' : ''}
                    {$inExpedition ? 'disabled' : ''}
                    "
            disabled={$inExpedition}
            type="button"
            on:click={() => {
                toggleTab(TABS.INDUSTRY);
            }}
        >
            <span class="w-8 h-8 m-auto bg-industry" />
        </button>
    {/if}
    {#if displayScienceTab}
        <button
            class="flex rpgui-button tab-width 
                {currentTab === TABS.SCIENCE ? 'selected' : ''}
                {$inExpedition ? 'disabled' : ''}
                "
            disabled={$inExpedition}
            type="button"
            on:click={() => {
                toggleTab(TABS.SCIENCE);
            }}
        >
            <span class="w-8 h-8 m-auto bg-science" />
        </button>
    {/if}
    {#if displayLibraryTab}
        <button
            class="flex rpgui-button tab-width 
                {currentTab === TABS.LIBRARY ? 'selected' : ''}
                {$inExpedition ? 'disabled' : ''}
                "
            disabled={$inExpedition}
            type="button"
            on:click={() => {
                toggleTab(TABS.LIBRARY);
            }}
        >
            <span class="w-8 h-8 m-auto bg-library" />
        </button>
    {/if}
    {#if displayMilitaryTabs}
        <button
            class="flex rpgui-button tab-width 
                {currentTab === TABS.BARRACKS ? 'selected' : ''}
                {$inExpedition ? 'disabled' : ''}
                "
            disabled={$inExpedition}
            type="button"
            on:click={() => {
                toggleTab(TABS.BARRACKS);
            }}
        >
            <span class="w-8 h-8 m-auto bg-barracks" />
        </button>

        <button
            class="flex rpgui-button tab-width 
                {currentTab === TABS.EXPEDITION ? 'selected' : ''}
                {$inExpedition ? 'disabled' : ''}
                "
            disabled={$inExpedition}
            type="button"
            on:click={() => {
                toggleTab(TABS.EXPEDITION);
            }}
        >
            <span class="w-8 h-8 m-auto bg-expedition" />
        </button>
    {/if}
    <button
        class="flex rpgui-button tab-width 
            {currentTab === TABS.SAVE ? 'selected' : ''}
            {$inExpedition ? 'disabled' : ''}
            "
        disabled={$inExpedition}
        type="button"
        on:click={() => toggleTab(TABS.SAVE)}
    >
        <span class="w-8 h-8 m-auto bg-save" />
    </button>
</div>

<style>
    .tab-width {
        width: 105px;
        min-width: 0px !important;
    }
</style>
