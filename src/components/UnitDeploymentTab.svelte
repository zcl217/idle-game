<script lang="ts">
import { cloneDeep } from "lodash";

    import { HEAVY_INFANTRY, MAGE } from "~/constants/military/units/humans";
import type { IMilitaryUnit } from "~/interfaces/military/units";
    import { militaryUnitList, unitHasBeenDeployed, unitToDeploy } from "~/store/military";
    import { getSprite } from "~/utils/helpers";
    import DeployableUnit from "./military/DeployableUnit.svelte";

    let availableUnits: IMilitaryUnit[] = [];

    $: {
        availableUnits = cloneDeep($militaryUnitList);
    }

    $: {
        if ($unitHasBeenDeployed) {
        console.log($unitHasBeenDeployed);
            subtractUnitCount($unitToDeploy.spriteInfo.unitType);
            unitHasBeenDeployed.set(false);
        }
    }

    const subtractUnitCount = (type: string) => {
        console.log(type);
        for (let unit of availableUnits) {
            if (unit.type === type) {
                unit.count--;
                availableUnits = availableUnits;
                break;
            }
        }
    }
</script>

<div class="mt-12 rpgui-container framed-golden-2 w-min-283px">
    <p class="text-center">Available Units</p>
    {#each availableUnits as unit}
        <DeployableUnit
            sprite={getSprite(unit.type)}
            unitCount={unit.count}
        />
    {/each}
</div>

<style>
    .w-min-283px {
        min-width: 283px;
    }
</style>
