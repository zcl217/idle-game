<script lang="ts">
    export let characterImage: string, characterName: string;
</script>

{#if characterImage !== ""}
    <div class="relative mb-3 justify-self-center">
        <p class="w-32 text-center">{characterName}</p>
        <!-- 
    <div class="relative p-3 w-36 h-36 rpgui-container framed"> 
        -->
        <div class="relative w-32 h-32 p-0 rpgui-container framed">
            <img class="w-24 h-24" src={characterImage} alt="player" />
        </div>
    </div>
{/if}
