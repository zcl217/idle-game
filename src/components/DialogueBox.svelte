<script lang="ts">
    import { onMount } from "svelte";
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
    } from "../store/dialogue";
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
        <!-- not sure why mt pt not working here -->
        <div
            class="text-sm dialogue-text"
            style="margin-top: {$characterImage !== '' ? 40 : 0}px"
            class:text-center={$characterImage === ""}
        >
            {@html $mainText}
        </div>

        <div class="absolute bottom-0 flex justify-around w-full mb-12">
            <button
                class="flex items-center rpgui-button golden"
                type="button"
                on:click={() => $yesHandler()}
            >
                <p class="p-4">{$yesText}</p>
            </button>
            {#if $noText.length > 0}
                <button
                    class="flex items-center rpgui-button golden"
                    type="button"
                    on:click={() => $noHandler()}
                >
                    <p class="p-4">{$noText}</p>
                </button>
            {/if}
        </div>
    </div>
{/if}

<style>
    .dialogue-text {
        font-family: Arial, Helvetica, sans-serif !important;
        line-height: 25px !important;
        font-size: 23px !important;
        color: #fff;
        text-shadow: 1.5px 0 0 #000, 0 -1.5px 0 #000, 0 1.5px 0 #000,
            -1.5px 0 0 #000;
    }
</style>
