<script lang="ts">
    import MapSelection from "./MapSelection.svelte";
    import ExpeditionMode from "./ExpeditionMode.svelte";
    import { inExpedition, resourcesFromExpeditions } from "~/store/gameState";
    import { STAGE_LIST, STAGE_REWARD_LIST } from "~/constants/military/stageList";
import { clearedStages } from "~/store/military";

    let mapSelectionMode = true;
    let selectedStage = STAGE_LIST["1-1"];

    const startExpedition = (payload: any) => {
        mapSelectionMode = false;
        console.log(payload.detail);
        inExpedition.set(true);
        selectedStage = payload.detail;
    };

    const handleVictory = () => {
        mapSelectionMode = true;
        inExpedition.set(false);
        if ($clearedStages[selectedStage]) return;
        $clearedStages[selectedStage] = true;
        const rewards = STAGE_REWARD_LIST[selectedStage];
        for (let reward of rewards) {
            resourcesFromExpeditions.increaseResourceRate(reward.resource, reward.amountPerSecond);
        }
    };

    const handleDefeat = () => {
        console.log("received");
        mapSelectionMode = true;
        inExpedition.set(false);
    };
</script>

{#if mapSelectionMode}
    <MapSelection on:startExpedition={startExpedition} />
{:else}
    <ExpeditionMode
        on:VICTORY={handleVictory}
        on:DEFEAT={handleDefeat}
        stage={selectedStage}
    />
{/if}
