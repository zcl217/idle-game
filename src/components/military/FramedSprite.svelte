<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { SPRITE_SIZES } from "~/constants/military/sprites";
    import { SPRITESHEET_MAP } from "~/constants/military/spriteSheetMap";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { getMenuBackgroundPosition } from "~/utils/helpers";

    export let sprite: ISprite;
    let interval = 0;
    let currentFrame = 0;
    let backgroundPosition = getMenuBackgroundPosition(
        sprite,
        SPRITESHEET_MAP[sprite.spriteInfo.unitType].idleFrames,
        currentFrame
    );
    let isType1 = sprite.spriteInfo.spriteSize === SPRITE_SIZES.TYPE_1;
    $: isType1 = sprite.spriteInfo.spriteSize === SPRITE_SIZES.TYPE_1;

    onMount(() => {
        interval = setInterval(() => {
            let idleFrames =
                SPRITESHEET_MAP[sprite.spriteInfo.unitType].idleFrames;
            if (currentFrame >= idleFrames.length) currentFrame = 0;
            backgroundPosition = getMenuBackgroundPosition(
                sprite,
                idleFrames,
                currentFrame
            );
            currentFrame++;
        }, 250);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="relative w-32 h-32 p-0 rpgui-container framed">
    <div class="flex items-center justify-center h-full">
        <div
            class={isType1 ? "type1FrameSize" : "h-24 w-24"}
            style="
            background-image: url('${SPRITESHEET_MAP[sprite.spriteInfo.unitType]
                .spriteSheet}');
            background-position: {backgroundPosition};
        "
        />
    </div>
</div>

<style>
    .type1FrameSize {
        width: 72px;
        height: 72px;
    }
</style>
