<script lang="ts">
    import { UNIT_TYPES } from "~/constants/military/units/unitTypes";

    import type { ISprite } from "~/interfaces/military/sprite";
    import {
        shouldHighlightMeleeCells,
        shouldHighlightRangedCells,
        unitHasBeenDeployed,
        unitToDeploy,
    } from "~/store/military";
    import FramedSprite from "./FramedSprite.svelte";

    export let sprite: ISprite,
        unitCount = 0,
        shouldAnimateSprite = true;

    const BUTTON_WIDTH = 140;
    let deploymentMode = false;
    $: {
        if ($unitHasBeenDeployed) deploymentMode = false;
    }

    const handleDeployClick = () => {
        if (unitCount === 0) return;
        if (deploymentMode) {
            // if we click the same unit again, turn off deployment mode
            if (
                sprite?.spriteInfo.unitType ===
                $unitToDeploy?.spriteInfo?.unitType
            ) {
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
        // make the cells green.
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

    const isHeavyInfantryLine = (sprite: ISprite) => {
        return (
            sprite.spriteInfo.unitType === UNIT_TYPES.HEAVY_INFANTRY ||
            sprite.spriteInfo.unitType === UNIT_TYPES.SHOCKTROOPER ||
            sprite.spriteInfo.unitType === UNIT_TYPES.SIEGETROOPER
        );
    };
</script>

<div class="relative mt-4 justify-self-center">
    <div class="flex flex-col items-center">
        <button
            class="rpgui-button button-width {unitCount === 0
                ? 'disabled'
                : ''}"
            disabled={unitCount === 0}
            on:click={handleDeployClick}
        >
            <!-- {#if isHovering}
                <div
                    class="absolute left-0 right-0 m-auto bg-black rounded-lg opacity-50 h72px w72px"
                />
            {/if} -->
            <FramedSprite isSmallFrame={true} {sprite} {shouldAnimateSprite} />
        </button>
        <p class="text-center">x {unitCount}</p>
        <!-- <button
            style="width: {BUTTON_WIDTH}px"
            class="absolute h-16 m-3 mx-2 top-2/5 rpgui-button l-90px"
            type="button"
            disabled={unitCount === 0}
            on:click={handleDeployClick}
        >
            <p>Deploy</p>
        </button> -->
    </div>
</div>

<style>
    .mt-15px {
        margin-top: 15px !important;
    }

    .h72px {
        height: 72px;
    }

    .w72px {
        width: 72px;
    }

    .left-0 {
        left: 0px;
    }

    .right-0 {
        right: 0px;
    }

    .button-width {
        width: 120px;
        height: 80px;
        padding: 0px;
        min-width: 0px !important;
    }

    .rounded-lg {
        border-radius: 0.5rem;
    }
</style>
