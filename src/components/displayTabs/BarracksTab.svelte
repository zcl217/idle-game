<script lang="ts">
    import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
    import { researchedSciences } from "~/store/gameState";
    import BarracksUnitList from "./BarracksUnitList.svelte";
    import BarracksUnitLoadout from "./BarracksUnitLoadout.svelte";

    const advancedUnits = [
      SCIENCE_BUTTON_TYPES.SLINGSHOTS,
      SCIENCE_BUTTON_TYPES.HEAVY_INFANTRY,
      SCIENCE_BUTTON_TYPES.MAGIC,
      SCIENCE_BUTTON_TYPES.THUNDERSTICKS
    ]
    enum TABS {
        UNIT_LIST,
        LOADOUT,
    }
    let selectedTab = TABS.UNIT_LIST;
    let researchCount = 0;
    $: {
        let newResearchCount = 0;
        for (let advancedUnit of advancedUnits) {
          if ($researchedSciences.has(advancedUnit)) newResearchCount++;
        }
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
