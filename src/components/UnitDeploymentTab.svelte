<script lang="ts">
    import { cloneDeep, entries } from "lodash";
    import { SCIENCE_BUTTON_TYPES } from "~/constants/buttons/scienceButtons";
    import { LIBRARY_COLLECTIONS } from "~/constants/library/library";

    import { HEAVY_INFANTRY, MAGE } from "~/constants/military/units/humans";
    import { UNIT_TYPES } from "~/constants/military/units/unitTypes";
    import type { ISprite } from "~/interfaces/military/sprite";
    import type { IMilitaryUnit } from "~/interfaces/military/units";
    import { researchedSciences } from "~/store/gameState";
    import { completedCollections } from "~/store/library";
    import {
        militaryUnitList,
        selectedMilitaryUnits,
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
            unitToDeploy.set({} as ISprite);
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
</script>

<div class="flex flex-col ml-3">
    <p class="mb-3 text-center h-52px">Available Units</p>
    {#if $selectedMilitaryUnits.length > 0}
        <div class="relative p-0 rpgui-container framed-golden">
            {#each $selectedMilitaryUnits as unit}
                <DeployableUnit
                    sprite={getSprite(availableUnits[unit].type)}
                    unitCount={availableUnits[unit].count}
                    shouldAnimateSprite={false}
                />
            {/each}
        </div>
    {/if}
</div>

<style>
    .h-52px {
        height: 52px;
    }
</style>
