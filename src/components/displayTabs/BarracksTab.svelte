<script lang="ts">
    import { spriteSizes } from "~/constants/military/sprites";
    import { heavyInfantry } from "~/constants/military/units/humans";
    import BarracksUnit from "../military/BarracksUnit.svelte";
    import { militaryUnitList } from "~/store/military";
    import { getSprite } from "~/utils/helpers";
</script>

asdf
<div class="flex flex-row flex-wrap justify-around">
    {#each $militaryUnitList as unit}
        <BarracksUnit sprite={getSprite(unit.type)} unitCount={unit.count} />
    {/each}
    <BarracksUnit sprite={heavyInfantry} />
    <BarracksUnit sprite={heavyInfantry} />
    <BarracksUnit sprite={heavyInfantry} />
</div>
