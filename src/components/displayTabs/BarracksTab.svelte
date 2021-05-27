<script lang="ts">
    import { SPRITE_SIZES } from "~/constants/military/sprites";
    import { HEAVY_INFANTRY } from "~/constants/military/units/humans";
    import BarracksUnit from "../military/BarracksUnit.svelte";
    import { militaryUnitList } from "~/store/military";
    import { getSprite } from "~/utils/helpers";
</script>

<div class="flex flex-row flex-wrap justify-around">
    {#each $militaryUnitList as unit}
        <BarracksUnit sprite={getSprite(unit.type)} unitCount={unit.count} />
    {/each}
    <BarracksUnit sprite={HEAVY_INFANTRY} />
    <BarracksUnit sprite={HEAVY_INFANTRY} />
    <BarracksUnit sprite={HEAVY_INFANTRY} />
</div>
