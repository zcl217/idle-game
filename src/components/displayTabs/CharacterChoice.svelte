<script lang="ts">
    import InfoBoxButton from "../InfoBoxButton.svelte";
    import CharacterFrame from "../CharacterFrame.svelte";
    import { BUTTON_WIDTH, BUTTON_CATEGORIES, OTHER_BUTTON_TYPES } from "~/constants/buttons/buttons";
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
            width={BUTTON_WIDTH}
            curButtonType={OTHER_BUTTON_TYPES.LORD_1}
            curButtonCategory={BUTTON_CATEGORIES.OTHER}
            handler={() => {
                selectLord("lord1");
            }}
        />
    </div>
    <div class="m-auto">
        <InfoBoxButton
            width={BUTTON_WIDTH}
            curButtonType={OTHER_BUTTON_TYPES.LORD_2}
            curButtonCategory={BUTTON_CATEGORIES.OTHER}
            handler={() => {
                selectLord("lord2");
            }}
        />
    </div>
</div>
