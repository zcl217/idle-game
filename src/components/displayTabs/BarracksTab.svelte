<script lang="ts">
    import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
    import { researchedSciences } from "~/store/gameState";
    import BarracksUnitList from "./BarracksUnitList.svelte";
    import BarracksUnitLoadout from "./BarracksUnitLoadout.svelte";

    enum TABS {
        UNIT_LIST,
        LOADOUT,
    }
    let selectedTab = TABS.UNIT_LIST;
    let researchCount = 0;
    $: {
        let newResearchCount = 0;
        if ($researchedSciences.has(SCIENCE_BUTTON_TYPES.SLINGSHOTS))
            newResearchCount++;
        if ($researchedSciences.has(SCIENCE_BUTTON_TYPES.HEAVY_INFANTRY))
            newResearchCount++;
        if ($researchedSciences.has(SCIENCE_BUTTON_TYPES.MAGIC))
            newResearchCount++;
        if ($researchedSciences.has(SCIENCE_BUTTON_TYPES.THUNDERSTICKS))
            newResearchCount++;
        researchCount = newResearchCount;
    }
</script>

{#if researchCount >= 4}
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
