<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    const increment = () => {
        dispatch("increment");
    };
    const decrement = () => {
        dispatch("decrement");
    };
</script>

<div>
    [
    <span class="rpgui-cursor-point" on:click={decrement}> - </span>
    /
    <span class="rpgui-cursor-point" on:click={increment}> + </span>
    ]
</div>
