<script lang="ts">
    import type { IExpeditionCell } from "~/interfaces/military/expeditionGrid";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { unitToDeploy } from "~/store/military";
    import Sprite from "./Sprite.svelte";
    import { getExpeditionBackgroundPosition } from "~/utils/helpers";
    import { SPRITESHEET_MAP } from "~/constants/military/spriteSheetMap";
    import { CELL_HEIGHT, CELL_WIDTH } from "~/constants/military/maps";

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

    $: {
        if (!cell.isDeployable) {
            displayDeployableSprite = false;
        }
    }

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
            style="top: {row * CELL_HEIGHT}px; left: {col * CELL_WIDTH}px"
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
</style>
