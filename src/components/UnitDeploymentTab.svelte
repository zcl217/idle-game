<script lang="ts">
    import { cloneDeep, entries } from "lodash";
import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";

    import { HEAVY_INFANTRY, MAGE } from "~/constants/military/units/humans";
import { UNIT_TYPES } from "~/constants/military/units/unitTypes";
    import type { IMilitaryUnit } from "~/interfaces/military/units";
import { researchedSciences } from "~/store/gameState";
    import {
        militaryUnitList,
        unitHasBeenDeployed,
        unitToDeploy,
    } from "~/store/military";
    import { getSprite } from "~/utils/helpers";
    import DeployableUnit from "./military/DeployableUnit.svelte";

    let availableUnits: Record<string, { count: number; type: string }> = {};

    $: {
        availableUnits = cloneDeep($militaryUnitList);
    }

    $: {
        if ($unitHasBeenDeployed) {
            subtractUnitCount($unitToDeploy.spriteInfo.unitType);
            unitHasBeenDeployed.set(false);
        }
    }
    const subtractUnitCount = (type: string) => {
        for (let [key, unit] of Object.entries(availableUnits)) {
            if (unit.type === type) {
                unit.count--;
                availableUnits = availableUnits;
                break;
            }
        }
    };
    const unlockedUnit = (type: string) => {
        return true;
        switch(type) {
            case UNIT_TYPES.FOOTPAD:
                return $researchedSciences.has(SCIENCE_BUTTON_TYPES.SLINGSHOTS);
            case UNIT_TYPES.HEAVY_INFANTRY:
                return $researchedSciences.has(SCIENCE_BUTTON_TYPES.HEAVY_INFANTRY);
            case UNIT_TYPES.MAGE:
                return $researchedSciences.has(SCIENCE_BUTTON_TYPES.MAGIC);
            default:
                return true;
        }
    }
</script>

<div class="mt-12 rpgui-container framed-golden-2 w-min-283px">
    <p class="text-center">Available Units</p>
    {#each Object.entries(availableUnits) as [key, unit]}
        {#if unlockedUnit(unit.type)}
            <DeployableUnit
                sprite={getSprite(unit.type)}
                unitCount={unit.count}
            />
        {/if}
    {/each}
</div>

<style>
    .w-min-283px {
        min-width: 283px;
    }
</style>
