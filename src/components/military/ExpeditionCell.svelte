<script lang="ts">
    import type { IExpeditionCell } from "~/interfaces/military/expeditionGrid";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { unitToDeploy } from "~/store/military";
    import Sprite from "./Sprite.svelte";
    import { getBackgroundPosition } from "~/utils/helpers";
    import { spriteSheetMap } from "~/constants/military/spriteSheetMap";

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
        }
    };

    const handleCellLeave = () => {
        // check the property of cell
        if (cell.isDeployable) {
            // get the type of unit to deploy from store
            // and then hide low opacity sprite
            displayDeployableSprite = false;
        }
    };

    const emitCellClick = () => {
        displayDeployableSprite = false;
        handleCellClick();
    };
</script>

<div
    class="bg-cover cell"
    style="background-image: {cell.backgroundImage}"
    on:mouseenter={handleCellEnter}
    on:mouseleave={handleCellLeave}
    on:click={emitCellClick}
>
    {#if cell.isDeployable}
        <div
            style="background-color: rgba(123, 239, 178, 0.5)"
            class="highlightedCell"
        />
    {/if}
    {#if cell.startOfPath}
        <div
            style="background-color: rgba(240, 52, 52, 0.5)"
            class="highlightedCell"
        />
    {/if}
    {#if cell.endOfPath}
        <div
            style="background-color: rgba(30, 139, 195, 0.5)"
            class="highlightedCell"
        />
    {/if}
    {#if displayDeployableSprite}
        <div
            class="absolute opacity-50"
            style="top: {row * 72}px; left: {col * 72 + sprite.offset}px"
        >
            <Sprite {sprite} />
        </div>
    {/if}
</div>

<style>
    .highlightedCell {
        width: 90%;
        height: 90%;
        border-radius: 50px;
        margin: 0 auto;
    }
    .cell {
        height: 72px;
        width: 72px;
    }
</style>
