<script lang="ts">
    import type { ISprite } from "~/interfaces/military/sprite";
    import {
        highlightMeleeCells,
        highlightRangedCells,
        unitToDeploy,
    } from "~/store/military";
    import FramedSprite from "./FramedSprite.svelte";

    export let sprite: ISprite,
        unitCount = 0;

    const BUTTON_WIDTH = 145;
    let deploymentMode = false;

    const handleDeployClick = () => {
        if (deploymentMode) {
            highlightMeleeCells.set(false);
            highlightRangedCells.set(false);
            deploymentMode = false;
            return;
        }
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
            highlightMeleeCells.set(true);
        } else {
            highlightRangedCells.set(true);
        }
        //after you click the cell, then you deploy.
    };
</script>

<div class="relative mt-4 justify-self-center">
    <div class="flex flex-row">
        <FramedSprite {sprite} />
        <button
            style="width: {BUTTON_WIDTH}px"
            class="absolute h-20 m-3 mx-2 top-1/5 rpgui-button l-90px"
            type="button"
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

    .top-1\/5 {
        top: 20%;
    }
</style>
