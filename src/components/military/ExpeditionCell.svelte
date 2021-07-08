<script lang="ts">
    import type { IExpeditionCell } from "~/interfaces/military/expeditionGrid";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { attackRangeCenterCoordinates, unitToDeploy } from "~/store/military";
    import Sprite from "./Sprite.svelte";
    import { getExpeditionBackgroundPosition } from "~/utils/helpers";
    import { SPRITESHEET_MAP } from "~/constants/military/spriteSheetMap";
    import { CELL_HEIGHT, CELL_WIDTH } from "~/constants/military/maps";
import type { ICoordinates } from "~/interfaces/common";

    export let handleCellClick: any,
        cell: IExpeditionCell,
        row: number,
        col: number;

    let displayDeployableSprite = false;
    let sprite: ISprite = {} as ISprite;

    const handleCellEnter = () => {
        // check the property of cell
        if (cell.isDeployable) {
            // get the type of unit to deploy from store
            // and then show low opacity sprite on it
            sprite = $unitToDeploy;
            displayDeployableSprite = true;
            attackRangeCenterCoordinates.set({ row, col });
        } else {
            attackRangeCenterCoordinates.set({ row: -1, col: -1 });
        }
    };

    $: {
        if (!cell.isDeployable) {
            displayDeployableSprite = false;
        }
    }
    $: {
        if ($attackRangeCenterCoordinates.col === -1) cell.highlightAttackRange = false;
    }

    const handleCellLeave = () => {
        // check the property of cell
        if (cell.isDeployable) {
            // get the type of unit to deploy from store
            // and then hide low opacity sprite
            displayDeployableSprite = false;
            attackRangeCenterCoordinates.set({} as ICoordinates);
        }
    };

    const emitCellClick = () => {
        displayDeployableSprite = false;
        handleCellClick();
    };
</script>

<div
    class="bg-cover"
    style="
        background-image: {cell.backgroundImage};
        width: {CELL_WIDTH}px;
        height: {CELL_HEIGHT}px;
    "
    on:mouseenter={handleCellEnter}
    on:mouseleave={handleCellLeave}
    on:click={emitCellClick}
>
    {#if cell.highlightAttackRange === true}
        <div class="attackRangeCell" />
    {/if}
    {#if cell.isDeployable}
        <div
            style="background-color: rgba(123, 239, 178, 0.5)"
            class="highlightedCell"
        />
    {/if}
    {#if displayDeployableSprite}
        <div
            class="absolute opacity-50"
            style="top: {row * CELL_HEIGHT}px; left: {col * CELL_WIDTH}px"
        >
            <Sprite {sprite} />
        </div>
    {/if}
</div>

<style>
    .highlightedCell {
        /* width: 90%;
        height: 90%; */
        width: 65px;
        height: 65px;
        border-radius: 50px;
        margin: 0 auto;
        position: absolute;
    }

    .attackRangeCell {
        /* width: 90%;
        height: 90%; */
        width: 70px;
        height: 70px;
        background-color: rgba(240, 52, 52, 0.5);

        position: absolute;
    }
</style>
