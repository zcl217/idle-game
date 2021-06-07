<script lang="ts">
    import MapSelection from "./MapSelection.svelte";
    import ExpeditionMode from "./ExpeditionMode.svelte";
    import { inExpedition, resourcesFromExpeditions } from "~/store/gameState";
    import {
        STAGE_LIST,
        STAGE_REWARD_LIST,
    } from "~/constants/military/stageList";
    import { clearedStages } from "~/store/military";
    import { resources } from "~/store/resources";

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
        [STAGE_LIST["3-1"]]: 1,
        [STAGE_LIST["3-1"]]: 1,
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
        const rewards = STAGE_REWARD_LIST[selectedStage];
        for (let reward of rewards) {
            if (reward.amountPerSecond === 0) {
                resources.updateResourceValue(reward.resourceType, 1);
                continue;
            }
            resourcesFromExpeditions.increaseResourceRate(
                reward.resourceType,
                reward.amountPerSecond
            );
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
    <ExpeditionMode
        on:VICTORY={handleVictory}
        on:DEFEAT={handleDefeat}
        stage={selectedStage}
        mapType={MAP_TYPES[selectedStage]}
    />
{/if}
