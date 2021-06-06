<script lang="ts">
    export let spriteSheet: string,
        positionSpring: any,
        positionXTweened: any,
        positionYTweened: any,
        homing: boolean;
</script>

<div
    style="
            background-image: url('${spriteSheet}'); 
            left: {homing ? $positionSpring.x : $positionXTweened}px; 
            top: {homing ? $positionSpring.y : $positionYTweened}px;
            width: 50px;
            height: 50px;
        "
    class="absolute z-10 pointer-events-none"
/>
