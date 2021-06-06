<script lang="ts">
    import BarracksUnit from "../military/BarracksUnit.svelte";
    import { militaryUnitList } from "~/store/military";
    import { getSprite } from "~/utils/helpers";
    import { UNIT_TYPES } from "~/constants/military/units/unitTypes";
    import { researchedSciences } from "~/store/gameState";
    import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
    import { PIKEMAN } from "~/constants/military/units/humans";

    const displayUnit = (unitType: string): boolean => {
        switch (unitType) {
            case UNIT_TYPES.FOOTPAD:
                return $researchedSciences.has(SCIENCE_BUTTON_TYPES.SLINGSHOTS);
            case UNIT_TYPES.HEAVY_INFANTRY:
                return $researchedSciences.has(
                    SCIENCE_BUTTON_TYPES.HEAVY_INFANTRY
                );
            case UNIT_TYPES.MAGE:
                return $researchedSciences.has(SCIENCE_BUTTON_TYPES.MAGIC);
            default:
                return true;
        }
    };
</script>

<div class="flex flex-row flex-wrap justify-between">
    {#each $militaryUnitList as unit}
        {#if displayUnit(unit.type)}
            <BarracksUnit
                sprite={getSprite(unit.type)}
                unitCount={unit.count}
            />
        {/if}
    {/each}
</div>
