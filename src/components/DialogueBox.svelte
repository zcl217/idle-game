<script lang="ts">
    import CharacterFrame from "../components/CharacterFrame.svelte";
    import {
        displayDialogueBox,
        characterImage,
        characterName,
        mainText,
        yesText,
        noText,
        yesHandler,
        noHandler,
    } from "../store/dialogue.js";
</script>

{#if $displayDialogueBox}
    <div class="fixed top-0 z-10 w-full h-screen bg-black opacity-30" />
    <div
        class="absolute bottom-0 z-20 w-3/4 transform -translate-x-1/2 h-1/2 left-1/2 rpgui-container framed-golden"
    >
        <div class="float-left mr-4">
            <CharacterFrame
                characterImage={$characterImage}
                characterName={$characterName}
            />
        </div>
        <div
            class="text-sm"
            class:mt-10={$characterImage !== ""}
            class:text-center={$characterImage === ""}
        >
            {@html $mainText}
        </div>

        <div class="absolute bottom-0 flex justify-around w-full mb-12">
            <button
                class="flex items-center rpgui-button golden"
                type="button"
                on:click={$yesHandler}
            >
                <p class="p-4">{$yesText}</p>
            </button>
            {#if $noText.length > 0}
                <button
                    class="flex items-center rpgui-button golden"
                    type="button"
                    on:click={$noHandler}
                >
                    <p class="p-4">{$noText}</p>
                </button>
            {/if}
        </div>
    </div>
{/if}

<style>
    .text-shadow {
        color: #fff;
        text-shadow: 2px 0 0 #000, 0 -2px 0 #000, 0 2px 0 #000, -2px 0 0 #000;
    }
</style>
