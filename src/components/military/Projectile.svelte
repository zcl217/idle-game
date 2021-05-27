<script lang="ts">
    import { onMount } from "svelte";

    import { spring, tweened } from "svelte/motion";
    import type { IProjectile } from "~/interfaces/military/projectile";

    export let projectile: IProjectile,
        handleHomingProjectileCollision: Function;

    let width: number = 0,
        height: number = 0,
        positionXTweened: any = tweened(0, {
            duration: 1000,
        }),
        positionYTweened: any = tweened(0, {
            duration: 1000,
        }),
        positionSpring: any = spring({ x: 0, y: 0 }),
        targetPositionX: any,
        targetPositionY: any,
        homing: boolean,
        targetHit: boolean = false;

    onMount(() => {
        homing = projectile.homing;
        if (homing) {
            positionSpring = projectile.positionSpring;
            targetPositionX = projectile.target.position.positionXTweened;
            targetPositionY = projectile.target.position.positionYTweened;
        } else {
            positionXTweened = projectile.positionXTweened;
            positionYTweened = projectile.positionYTweened;
        }
    });
    $: {
        if (!targetHit && homing) {
            let targetX = $targetPositionX;
            let targetY = $targetPositionY;
            positionSpring.set({ x: targetX, y: targetY });
        //    console.log(targetX + " " + targetY + " " + $positionSpring.x);
            let xDifference = Math.abs($positionSpring.x - targetX);
            let yDifference = Math.abs($positionSpring.y - targetY);
        //    console.log(xDifference + " " + yDifference);
            if (xDifference < 15 && yDifference < 15) {
                handleHomingProjectileCollision(projectile);
                targetHit = true;
            }
        }
    }
</script>

{#if !targetHit}
    <div
        style="
            background-image: url('${projectile.spriteSheet}'); 
            left: {homing ? $positionSpring.x : $positionXTweened}px; 
            top: {homing ? $positionSpring.y : $positionYTweened}px;
            width: 50px;
            height: 50px;
        "
        class="absolute pointer-events-none"
    />
{/if}