<script lang="ts">
    import { cloneDeep } from "lodash";
    import type { ISprite } from "~/interfaces/military/sprite";
    import {
        militaryUnitList,
        selectedMilitaryUnits,
        unitHasBeenDeployed,
        unitToDeploy,
    } from "~/store/military";
    import { getSprite, getUnitLineType } from "~/utils/helpers";
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
                    sprite={getSprite(availableUnits[getUnitLineType(unit)].type)}
                    unitCount={availableUnits[getUnitLineType(unit)].count}
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
