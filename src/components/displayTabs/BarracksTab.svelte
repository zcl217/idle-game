<script lang="ts">
    import { LIBRARY_COLLECTIONS } from "~/constants/library/library";
    import { completedCollections } from "~/store/library";
    import BarracksUnitList from "./BarracksUnitList.svelte";
    import BarracksUnitLoadout from "./BarracksUnitLoadout.svelte";
    
    enum TABS {
        UNIT_LIST,
        LOADOUT,
    }
    let selectedTab = TABS.UNIT_LIST;
</script>

{#if $completedCollections.has(LIBRARY_COLLECTIONS.TODO)}
    <div class="flex flex-row justify-around">
        <button
            class="rpgui-button {selectedTab === TABS.UNIT_LIST
                ? 'selected'
                : ''}"
            type="button"
            on:click={() => (selectedTab = TABS.UNIT_LIST)}
        >
            Units
        </button>
        <button
            class="rpgui-button {selectedTab === TABS.LOADOUT
                ? 'selected'
                : ''}"
            type="button"
            on:click={() => (selectedTab = TABS.LOADOUT)}
        >
            Loadout
        </button>
    </div>
{/if}

{#if selectedTab === TABS.UNIT_LIST}
    <BarracksUnitList />
{:else}
    <BarracksUnitLoadout />
{/if}
