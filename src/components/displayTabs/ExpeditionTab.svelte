<script lang="ts">
    import MapSelection from "./MapSelection.svelte";
    import ExpeditionMode from "../military/ExpeditionMode.svelte";
    import { curStoryProgress, inExpedition } from "~/store/gameState";
    import {
        STAGE_LIST,
        STAGE_REWARD_LIST,
    } from "~/constants/military/stageList";
    import { clearedStages } from "~/store/military";
    import {
        obtainedResources,
        resources,
        resourcesFromExpeditions,
    } from "~/store/resources";
    import UnitDeploymentTab from "~/components/UnitDeploymentTab.svelte";
    import { DIALOGUES, STORY_PROGRESS_LIST } from "~/constants/story";
    import { displayDialogueBox, updateDialogue } from "~/store/dialogue";
    import { areAllZoneStagesCleared } from "~/utils/helpers";

    const MAP_TYPES = {
        [STAGE_LIST["1-1"]]: 1,
        [STAGE_LIST["1-2"]]: 1,
        [STAGE_LIST["1-3"]]: 1,
        [STAGE_LIST["1-4"]]: 1,
        [STAGE_LIST["1-5"]]: 1,
        [STAGE_LIST["2-1"]]: 2,
        [STAGE_LIST["2-2"]]: 2,
        [STAGE_LIST["2-3"]]: 2,
        [STAGE_LIST["3-1"]]: 3,
        [STAGE_LIST["3-2"]]: 3,
        [STAGE_LIST["3-3"]]: 3,
    };
    let mapSelectionMode = true;
    let selectedStage = STAGE_LIST["1-1"];

    const startExpedition = (payload: any) => {
        mapSelectionMode = false;
        inExpedition.set(true);
        selectedStage = payload.detail;
    };

    const handleVictory = () => {
        mapSelectionMode = true;
        inExpedition.set(false);
        if ($clearedStages[selectedStage]) return;
        $clearedStages[selectedStage] = true;
        const zone = selectedStage.substring(0, 1);
        if (areAllZoneStagesCleared(zone, $clearedStages)) {
            const rewards = STAGE_REWARD_LIST[selectedStage];
            for (let reward of rewards) {
                if (reward.amountPerSecond === 0) {
                    resources.incrementResourceValue(reward.resourceType, 1);
                    obtainedResources.add(reward.resourceType);
                    continue;
                }
                resourcesFromExpeditions.increaseResourceRate(
                    reward.resourceType,
                    reward.amountPerSecond
                );
            }
            switch (zone) {
                case "1":
                    const nextScene = STORY_PROGRESS_LIST["A3S1"];
                    curStoryProgress.set(nextScene);
                    updateDialogue(DIALOGUES[nextScene]);
                    displayDialogueBox.set(true);
                    return;
                case "2":
                    return;
                default:
                    return;
            }
        }
    };

    const handleDefeat = () => {
        mapSelectionMode = true;
        inExpedition.set(false);
    };
</script>

{#if mapSelectionMode}
    <MapSelection on:startExpedition={startExpedition} />
{:else}
    <div class="flex flex-row justify-around">
        <ExpeditionMode
            on:VICTORY={handleVictory}
            on:DEFEAT={handleDefeat}
            stage={selectedStage}
            mapType={MAP_TYPES[selectedStage]}
        />
        <UnitDeploymentTab />
    </div>
{/if}
