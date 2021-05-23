<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import InfoBoxButton from "~/components/InfoBoxButton.svelte";
    import { buttonCategories } from "~/constants/buttons/buttons";
    import { militaryButtonTypes } from "~/constants/buttons/militaryButtons";
    import { spriteSheetMap } from "~/constants/military/spriteSheetMap";
    import type { ISprite } from "~/interfaces/military/sprite";
    import {
        highlightMeleeCells,
        highlightRangedCells,
        unitToDeploy,
    } from "~/store/military";

    export let sprite: ISprite,
        unitCount = 0;

    const buttonWidth = 145;

    let interval = 0;
    let currentFrame = 0;
    let backgroundPosition = `${sprite.offset / 1.5}px 0px`;
    let currentPositionX = sprite.offset;
    let currentPositionY = 0;

    onMount(() => {
        interval = setInterval(() => {
            let idleFrames = spriteSheetMap[sprite.spriteInfo.unitType].idleFrames;
            if (currentFrame >= idleFrames.length) currentFrame = 0;
            const spriteSheetPosition = idleFrames[currentFrame];
            const spriteSheetPositionX =
                spriteSheetPosition.col * -sprite.spriteInfo.spriteSize.x +
                sprite.offset / 1.5;
            const spriteSheetPositionY =
                spriteSheetPosition.row * -sprite.spriteInfo.spriteSize.y;
            backgroundPosition = `${spriteSheetPositionX}px ${spriteSheetPositionY}px`;
            currentFrame++;
        }, 250);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    const handleDeployClick = () => {
        unitToDeploy.set(sprite);
        highlightMapCells();
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
        <div class="relative w-32 h-32 p-0 rpgui-container framed">
            <div
                class="w-24 h-24"
                style="
                        background-image: url('${spriteSheetMap[sprite.spriteInfo.unitType].spriteSheet}');
                        background-position: {backgroundPosition};
                    "
            />
        </div>
        <button
            style="width: {buttonWidth}px"
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
