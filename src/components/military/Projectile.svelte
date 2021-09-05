<script lang="ts">
    import {
        PROJECTILE_TYPES,
        THUNDERSTICK_BLAST_HEIGHT,
        THUNDERSTICK_BLAST_WIDTH,
    } from "~/constants/military/projectiles";
    import { THUNDERSTICK_BLAST_SPRITESHEET_INFO } from "~/constants/military/spriteSheetInfo/projectiles/thunderstickBlast";
    import { getProjectileBackgroundPosition } from "~/utils/helpers";

    export let spriteSheet: string,
        type: string,
        positionSpring: any,
        positionXTweened: any,
        positionYTweened: any,
        homing: boolean,
        hasAnimation: boolean = false,
        currentFrame: number = 0;

    let backgroundPosition = "0px 0px";
    let width = 0;
    let height = 0;
    $: {
        switch (type) {
            case PROJECTILE_TYPES.THUNDERSTICK_BLAST:
                width = THUNDERSTICK_BLAST_WIDTH;
                height = THUNDERSTICK_BLAST_HEIGHT;
                break;
            default:
                width = 50;
                height = 50;
                break;
        }
    }
    $: {
        if (hasAnimation) {
            let attackFrames;
            switch (type) {
                case PROJECTILE_TYPES.THUNDERSTICK_BLAST:
                    attackFrames =
                        THUNDERSTICK_BLAST_SPRITESHEET_INFO.attackFrames;
                    break;
                default:
                    break;
            }
            backgroundPosition = getProjectileBackgroundPosition(
                PROJECTILE_TYPES.THUNDERSTICK_BLAST,
                attackFrames,
                currentFrame
            );
        }
    }
</script>

<div
    style="
            background-image: url('${spriteSheet}'); 
            left: {homing ? $positionSpring.x : $positionXTweened}px; 
            top: {homing ? $positionSpring.y : $positionYTweened}px;
            width: {width}px;
            height: {height}px;
            background-position: {backgroundPosition}
        "
    class="absolute z-10 pointer-events-none"
/>
