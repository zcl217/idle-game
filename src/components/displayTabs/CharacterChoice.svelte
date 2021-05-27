<script lang="ts">
    import InfoBoxButton from "../InfoBoxButton.svelte";
    import CharacterFrame from "../CharacterFrame.svelte";
    import {
        BUTTON_WIDTH,
        BUTTON_CATEGORIES,
    } from "~/constants/buttons/buttons";
    import { OTHER_BUTTON_TYPES } from "~/constants/buttons/otherButtons";
    import { DIALOGUES, STORY_PROGRESS_LIST } from "~/constants/story";
    import { updateDialogue, displayDialogueBox } from "~/store/dialogue";
    import {
        playerImage,
        playerName,
        curStoryProgress,
    } from "~/store/gameState.js";

    const selectLord = (lordType: string) => {
        const nextScene = STORY_PROGRESS_LIST["A2S1"];
        curStoryProgress.set(nextScene);
        updateDialogue(DIALOGUES[nextScene]);
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
        <p class="text-red-600">(work in progress)</p>
    </div>
</div>
