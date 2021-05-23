<script lang="ts">
    import { tabs } from "../constants/buttons/buttons";
    import { createEventDispatcher } from "svelte";
    //fix flex problem

    const dispatch = createEventDispatcher();

    const toggleTab = (tab: string) => {
        dispatch("toggleTab", tab);
    };
</script>

<div class="flex justify-around w-full mt-5 -mb-3">
    <button
        class="flex rpgui-button tabWidth"
        type="button"
        on:click={() => {
            toggleTab(tabs.MAIN_2);
        }}
    >
        <span class="w-8 h-8 m-auto bg-base" />
    </button>

    <button
        class="flex rpgui-button tabWidth"
        type="button"
        on:click={() => {
            toggleTab(tabs.WORKERS);
        }}
    >
        <span class="w-8 h-8 m-auto bg-worker" />
    </button>

    <button
        class="flex rpgui-button tabWidth"
        type="button"
        on:click={() => {
            toggleTab(tabs.SCIENCE);
        }}
    >
        <span class="w-8 h-8 m-auto bg-science" />
    </button>

    <button
        class="flex rpgui-button tabWidth"
        type="button"
        on:click={() => {
            toggleTab(tabs.BARRACKS);
        }}
    >
        <span class="w-8 h-8 m-auto bg-barracks" />
    </button>

    <button
        class="flex rpgui-button tabWidth"
        type="button"
        on:click={() => {
            toggleTab(tabs.EXPEDITION);
        }}
    >
        <span class="w-8 h-8 m-auto bg-expedition" />
    </button>
</div>

<style>
    .tabWidth {
        width: 140px;
    }
</style>
