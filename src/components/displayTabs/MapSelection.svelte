<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const list = [1, 2, 3, 4, 5];

    const dispatch = createEventDispatcher();

    const startExpedition = (map: string) => {
        dispatch("startExpedition", map);
    };
</script>

<div class="flex flex-row justify-around">
    <button class="rpgui-button" type="button" on:click={() => {}}> 1 </button>
    <button class="rpgui-button" type="button" on:click={() => {}}> 1 </button>
    <button class="rpgui-button" type="button" on:click={() => {}}> 3 </button>
</div>

<div class="flex flex-col justify-around flex-grow h-5/6">
    {#each list as test}
        <button class="w-10 rpgui-button" type="button" on:click={() => {}}>
            {test}
        </button>
    {/each}
</div>

<button class="w-10 rpgui-button" type="button" on:click={() => { startExpedition('test') }}>
    start
</button>
