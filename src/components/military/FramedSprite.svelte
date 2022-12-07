<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { SPRITE_SIZES } from "~/constants/military/sprites";
    import { SPRITESHEET_MAP } from "~/constants/military/spriteSheetMap";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { getSpriteBackgroundPosition } from "~/utils/helpers";

    export let sprite: ISprite,
        isSmallFrame: boolean = false,
        shouldAnimateSprite: boolean = true;
    let interval = 0;
    let currentFrame = 0;
    let backgroundPosition = getSpriteBackgroundPosition(
        sprite,
        SPRITESHEET_MAP[sprite.spriteInfo.unitType].idleFrames,
        currentFrame,
        shouldAnimateSprite
    );
    let isType1 = sprite.spriteInfo.spriteSize === SPRITE_SIZES.TYPE_1;
    $: isType1 = sprite.spriteInfo.spriteSize === SPRITE_SIZES.TYPE_1;
    $: {
        sprite;
        backgroundPosition = getSpriteBackgroundPosition(
            sprite,
            SPRITESHEET_MAP[sprite.spriteInfo.unitType].idleFrames,
            currentFrame,
            shouldAnimateSprite
        );
    }

    onMount(() => {
        if (shouldAnimateSprite) {
            interval = setInterval(() => {
                let idleFrames =
                    SPRITESHEET_MAP[sprite.spriteInfo.unitType].idleFrames;
                if (currentFrame >= idleFrames.length) currentFrame = 0;
                backgroundPosition = getSpriteBackgroundPosition(
                    sprite,
                    idleFrames,
                    currentFrame,
                    shouldAnimateSprite
                );
                currentFrame++;
            }, 250);
        }
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div
    class="relative p-0 rpgui-container {isSmallFrame
        ? ''
        : 'w-32 h-32 framed'} "
>
    <div class="flex items-center justify-center h-full">
        <!-- For non animating sprites or type 1 sprites, use type1FrameSize -->
        <div
            class={isType1 || !shouldAnimateSprite
                ? "type1FrameSize"
                : "h-24 w-24"}
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
