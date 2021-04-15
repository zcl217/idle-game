<script lang="ts">
    // import { messageLog } from '../store/gameState';
    let messageLog: any = []
    $: totalMessages = messageLog.length;
</script>

<div class="fixed bottom-0 w-3/12 overflow-y-auto border-white w-min-350px h-2/4">
    <hr/>
    <ul>
    {#each $messageLog as msg, i}
        <li
            class="my-2 text-red text-10px"
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
    .w-min-350px {
        min-width: 350px;
    }

    .text-10px {
        font-size: 10px;
    }
</style>
