<script lang="ts">
    import { TABS } from "../constants/buttons/buttons";
    import { createEventDispatcher } from "svelte";
    //fix flex problem

    let currentTab = TABS.MAIN_2;
    const dispatch = createEventDispatcher();
    

    const toggleTab = (tab: string) => {
        dispatch("toggleTab", tab);
        currentTab = tab;
    };
</script>

<div class="flex justify-around w-full mt-5 -mb-3">
    <button
        class="flex rpgui-button tabWidth {currentTab === TABS.MAIN_2 ? 'selected' : ''}"
        type="button"
        on:click={() => {
            toggleTab(TABS.MAIN_2);
        }}
    >
        <span class="w-8 h-8 m-auto bg-base" />
    </button>

    <button
        class="flex rpgui-button tabWidth {currentTab === TABS.WORKERS ? 'selected' : ''}"
        type="button"
        on:click={() => {
            toggleTab(TABS.WORKERS);
        }}
    >
        <span class="w-8 h-8 m-auto bg-worker" />
    </button>

    <button
        class="flex rpgui-button tabWidth {currentTab === TABS.SCIENCE ? 'selected' : ''}"
        type="button"
        on:click={() => {
            toggleTab(TABS.SCIENCE);
        }}
    >
        <span class="w-8 h-8 m-auto bg-science" />
    </button>

    <button
        class="flex rpgui-button tabWidth {currentTab === TABS.BARRACKS ? 'selected' : ''}"
        type="button"
        on:click={() => {
            toggleTab(TABS.BARRACKS);
        }}
    >
        <span class="w-8 h-8 m-auto bg-barracks" />
    </button>

    <button
        class="flex rpgui-button tabWidth {currentTab === TABS.EXPEDITION ? 'selected' : ''}"
        type="button"
        on:click={() => {
            toggleTab(TABS.EXPEDITION);
        }}
    >
        <span class="w-8 h-8 m-auto bg-expedition" />
    </button>
</div>

<style>
    .tabWidth {
        width: 140px;
    }
    .selected {
        background-image: url('img/button-down.png');
    }
</style>
