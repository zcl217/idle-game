<script lang="ts">
    import CharacterFrame from "../components/CharacterFrame.svelte";
    import { displayDialogueBox } from "../store/dialogue.js";
    import dialogues from "../constants/dialogues.js";
    import { scene, act } from "../store/gameState.js";
    import { onDestroy } from "svelte";

    let characterName: string,
        characterImage: string,
        mainText: string,
        yesText: string,
        noText: string,
        yesHandler: any,
        noHandler: any;

    //update dialogue text when text changes
    const unsubscribe = act.subscribe((value) => {
        const curScene = `A${value}S${$scene}`;
        console.log("act has changed");
        console.log(curScene);
        updateDialogue(curScene);
    });

    function updateDialogue(curScene: String) {
        const dialogue = dialogues[curScene];
        if (!dialogue) return;
        characterName = dialogue.characterName;
        characterImage = dialogue.characterImage;
        mainText = dialogue.mainText;
        yesText = dialogue.yesText;
        noText = dialogue.noText;
        (yesHandler = dialogue.yesHandler), (noHandler = dialogue.noHandler);
    }

    const test = () => {
        console.log("clicked");
        act.update((a) => "1");
    };

    onDestroy(unsubscribe);
</script>

{#if $displayDialogueBox}
    <div class="fixed top-0 z-10 w-full h-screen bg-black opacity-30" />
    <div
        on:click={test}
        class="absolute bottom-0 z-20 w-3/4 transform -translate-x-1/2 h-1/2 left-1/2 rpgui-container framed-golden"
    >
        asdf
        <CharacterFrame {characterImage} {characterName} />
        {mainText}

        <div class="absolute bottom-0 flex justify-around w-full mb-12">
            <button
                class="flex items-center rpgui-button golden"
                type="button"
                on:click={yesHandler}
            >
                <p class="p-4">{yesText}</p>
            </button>
            <button
                class="flex items-center rpgui-button golden"
                type="button"
                on:click={noHandler}
            >
                <p class="p-4">{noText}</p>
            </button>
        </div>
    </div>
{/if}
