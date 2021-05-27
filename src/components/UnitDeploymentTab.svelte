<script lang="ts">
import { HEAVY_INFANTRY, MAGE } from "~/constants/military/units/humans";
import DeployableUnit from "./military/DeployableUnit.svelte";



</script>

<div class="mt-12 rpgui-container framed-golden-2 w-min-283px">
    <p class="text-center"> Available Units </p>
    <DeployableUnit sprite={HEAVY_INFANTRY} />
    <DeployableUnit sprite={HEAVY_INFANTRY} />
    <DeployableUnit sprite={MAGE} />
    <DeployableUnit sprite={HEAVY_INFANTRY} />
</div>

<style>
    .w-min-283px {
        min-width: 283px;
    }
</style>