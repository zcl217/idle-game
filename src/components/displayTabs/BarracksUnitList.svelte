<script lang="ts">
    import BarracksUnit from "../military/BarracksUnit.svelte";
    import { militaryUnitList } from "~/store/military";
    import { getSprite, displayUnit } from "~/utils/helpers";
    import { researchedSciences } from "~/store/gameState";
    let unitList = $militaryUnitList;
    $: unitList = $militaryUnitList;
</script>

<div class="flex flex-row flex-wrap justify-around">
    {#each Object.entries(unitList) as [key, unit]}
        {#if displayUnit(unit.type, $researchedSciences)}
            <BarracksUnit sprite={getSprite(unit.type)} />
        {/if}
    {/each}
</div>
