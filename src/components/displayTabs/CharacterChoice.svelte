<script lang="ts">
    import InfoBoxButton from "../InfoBoxButton.svelte";
    import CharacterFrame from "../CharacterFrame.svelte";
    import { buttonWidth, buttonCategories, otherButtonTypes } from "~/constants/buttons/buttons";
    import dialogues from "~/constants/dialogueTextAndHandlers";
    import { updateDialogue, displayDialogueBox } from "~/store/dialogue";
    import {
        playerImage,
        playerName,
        act,
        scene,
        getCurActScene,
    } from "~/store/gameState.js";

    const selectLord = (lordType: string) => {
        act.set("2");
        scene.set("1");

        const curScene = getCurActScene();
        updateDialogue(dialogues[curScene]);
        displayDialogueBox.set(true);
    };
</script>

<CharacterFrame characterImage={$playerImage} characterName={$playerName} />
<div class="flex flex-col justify-around h-1/2">
    <div class="m-auto">
        <InfoBoxButton
            width={buttonWidth}
            curButtonType={otherButtonTypes.LORD_1}
            curButtonCategory={buttonCategories.OTHER}
            handler={() => {
                selectLord("lord1");
            }}
        />
    </div>
    <div class="m-auto">
        <InfoBoxButton
            width={buttonWidth}
            curButtonType={otherButtonTypes.LORD_2}
            curButtonCategory={buttonCategories.OTHER}
            handler={() => {
                selectLord("lord2");
            }}
        />
    </div>
</div>
