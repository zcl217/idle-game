<script lang="ts">
    import { tweened } from "svelte/motion";
    import { SPRITESHEET_MAP } from "~/constants/military/spriteSheetMap";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { getExpeditionBackgroundPosition } from "~/utils/helpers";

    export let sprite: ISprite;

    let spriteSheet: string,
        width: number,
        height: number,
        backgroundPosition: string,
        facingRight: boolean,
        positionXTweened: any = tweened(0, {
            duration: 1000,
        }),
        positionYTweened: any = tweened(0, {
            duration: 1000,
        }),
        currentHp: number = 0,
        maxHp: number = 0,
        hpBarOffsetX: number = 0,
        hpBarOffsetY: number = 0,
        offsetX: number = 0,
        offsetY: number = 0;

    $: {
        spriteSheet = SPRITESHEET_MAP[sprite.spriteInfo.unitType].spriteSheet;
        width = sprite.spriteInfo.spriteSize.x;
        height = sprite.spriteInfo.spriteSize.y;
        positionXTweened = sprite.position.positionXTweened;
        positionYTweened = sprite.position.positionYTweened;
        backgroundPosition = getExpeditionBackgroundPosition(sprite);
        facingRight = sprite.position.facingRight;
        currentHp = sprite.state.currentHp;
        maxHp = sprite.spriteInfo.maxHp;
        hpBarOffsetX = sprite.spriteInfo.hpBarOffsetX;
        (hpBarOffsetY = sprite.spriteInfo.hpBarOffsetY || 0),
            (offsetX = sprite.offsetX);
        offsetY = sprite.offsetY || 0;
    }
</script>

<div class="pointer-events-none">
    <div
        style="
        background-image: url('${spriteSheet}'); 
        left: {$positionXTweened + offsetX}px; 
        top: {$positionYTweened + offsetY}px;
        width: {width}px;
        height: {height}px;
        background-position: {backgroundPosition};
        transform: scaleX({facingRight ? 1 : -1});
    "
        class="absolute"
    />
    {#if currentHp < maxHp && maxHp > 0}
        <div
            style="
            
            left: {$positionXTweened + hpBarOffsetX}px;
            top: {$positionYTweened + height + hpBarOffsetY}px;
            width: 50px;
        "
            class="absolute"
        >
            <progress
                style="
                height: 7px;
                border: 1px black;
            "
                class="w-full"
                value={currentHp}
                max={maxHp}
            />
        </div>
    {/if}
</div>

<style>
    /*
        the moving part of the progress bar
    */
    progress::-moz-progress-bar {
        background: rgb(10, 253, 10);
    }
    progress::-webkit-progress-value {
        background: rgb(10, 253, 10);
    }
    progress {
        color: rgb(10, 253, 10);
        background-color: red;
    }

    /*
        the background of the progress bar
    */
    progress::-webkit-progress-bar {
        background-color: red;
        width: 100%;
    }
</style>
