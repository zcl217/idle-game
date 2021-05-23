<script lang="ts">
import { heavyInfantry } from "~/constants/military/units/humans";
import DeployableUnit from "./military/DeployableUnit.svelte";



</script>

<div class="rpgui-container framed-golden-2 w-min-283px">
    <p class="text-center"> Available Units </p>
    <DeployableUnit sprite={heavyInfantry} />
    <DeployableUnit sprite={heavyInfantry} />
    <DeployableUnit sprite={heavyInfantry} />
    <DeployableUnit sprite={heavyInfantry} />
</div>

<style>
    .w-min-283px {
        min-width: 283px;
    }
</style>