<script>
    import { tabs } from "../constants/buttons/buttons";
    import { createEventDispatcher } from "svelte";
    //fix flex problem

    const dispatch = createEventDispatcher();

    const toggleTab = (tab) => {
        dispatch("toggleTab", tab);
    }
    
</script>

<div class="w-full mt-5 -mb-3">
    <button
        class="rpgui-button"
        type="button"
        on:click={() => { toggleTab(tabs.MAIN_2) }}
    >
        <p>Base</p>
    </button>

    <button
        class="rpgui-button"
        type="button"
        on:click={() => { toggleTab(tabs.WORKERS) }}
    >
        <p>Workers</p>
    </button>

    <button
        class="rpgui-button"
        type="button"
        on:click={() => { toggleTab(tabs.SCIENCE) }}
    >
        <p>Science</p>
    </button>

    <button
        class="rpgui-button"
        type="button"
        on:click={() => { toggleTab(tabs.MILITARY) }}
    >
        <p>Military</p>
    </button>
</div>
