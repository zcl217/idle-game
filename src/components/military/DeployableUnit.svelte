<script lang="ts">
    import type { ISprite } from "~/interfaces/military/sprite";
    import {
        shouldHighlightMeleeCells,
        shouldHighlightRangedCells,
        unitHasBeenDeployed,
        unitToDeploy,
    } from "~/store/military";
    import FramedSprite from "./FramedSprite.svelte";

    export let sprite: ISprite,
        unitCount = 0;

    const BUTTON_WIDTH = 140;
    let deploymentMode = false;

    $: {
        if ($unitHasBeenDeployed) deploymentMode = false;
    }

    const handleDeployClick = () => {
        unitToDeploy.set(sprite);
        highlightMapCells();
        deploymentMode = true;
    };

    // toggle deploymentMode again if we finish deploying the unit
    $: {
        if (Object.keys($unitToDeploy).length === 0) deploymentMode = false;
    }

    const highlightMapCells = () => {
        //make the cells green.
        // send event based on sprite ranged or melee
        if (sprite.spriteInfo.melee) {
            shouldHighlightMeleeCells.set(true);
            shouldHighlightRangedCells.set(false);
        } else {
            shouldHighlightRangedCells.set(true);
            shouldHighlightMeleeCells.set(false);
        }
        //after you click the cell, then you deploy.
    };
</script>

<div class="relative mt-4 justify-self-center">
    <div class="flex flex-row">
        <FramedSprite {sprite} />
        <p class="ml-3 mt-7">x {unitCount}</p>
        <button
            style="width: {BUTTON_WIDTH}px"
            class="absolute h-16 m-3 mx-2 top-2/5 rpgui-button l-90px"
            type="button"
            disabled={unitCount === 0}
            on:click={handleDeployClick}
        >
            <p>Deploy</p>
        </button>
    </div>
</div>

<style>
    .l-90px {
        left: 90px;
    }

    .top-2\/5 {
        top: 40%;
    }
</style>
