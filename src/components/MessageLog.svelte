<script lang="ts">
// retrieve message array from store and for each it
    const messageLog = ['YOU ARE A PEASANT', 'YOU FARM WHEAT', 'THIS IS SOME REALLY loNG TEXT']
    messageLog.push(...messageLog);messageLog.push(messageLog.toString());messageLog.push(...messageLog);
    $: totalMessages = messageLog.length;
</script>

<div class="w-3/12 -mt-10 -ml-10 overflow-y-auto w-min-273px h-2/4 rpgui-container framed bg-none">
    <ul>
    {#each messageLog as msg, i}
        <li
            class="my-2 text-red"
            class:opacity-70={totalMessages > 5 && i === totalMessages - 3}
            class:opacity-50={totalMessages > 5 && i === totalMessages - 2}
            class:opacity-25={totalMessages > 5 && i === totalMessages - 1}
        >
            {msg}
        </li>
    {/each}
    </ul>
</div>

<style>
    .w-min-273px {
        min-width: 273px;
    }
</style>
