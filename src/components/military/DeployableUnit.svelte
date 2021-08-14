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
        if (deploymentMode) {
            // if we click the same unit again, turn off deployment mode
            if (sprite.spriteInfo.unitType === $unitToDeploy.spriteInfo.unitType) {
                deploymentMode = false;
                unitToDeploy.set({} as ISprite);
                return;
            }
        }
        unitToDeploy.set(sprite);
        highlightMapCells();
        deploymentMode = true;
    };

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
