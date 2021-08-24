<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {
        ALL_CLEAR_REWARDS,
        ENEMY_PREVIEW_LIST,
        STAGE_LIST,
    } from "~/constants/military/stageList";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { clearedStages } from "~/store/military";
    import { areAllZoneStagesCleared } from "~/utils/helpers";
    import StagePreview from "./StagePreview.svelte";

    const ZONES = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
    };

    let selectedZone = 0;
    let selectedStage = "";
    let zonePreviewImage = `url("zonePreviews/map${selectedZone}.png")`;
    const zone1: string[] = [];
    const zone2: string[] = [];
    const zone3: string[] = [];
    let zone2Unlocked: boolean = true;
    let zone3Unlocked: boolean = false;
    let enemyPreviewList: { sprite: ISprite; amount: number }[] = [];
    let enemySpawnPointText = "Enemy spawn point: Bottom";
    const dispatch = createEventDispatcher();

    for (let a = 0; a < 5; a++) {
        zone1.push("1");
    }
    for (let a = 0; a < 2; a++) {
        zone2.push("2");
    }
    for (let a = zone1.length; a > 0; a--) {
        zone1[a - 1] += `-${a}`;
    }
    for (let a = zone2.length; a > 0; a--) {
        zone2[a - 1] += `-${a}`;
    }
    $: {
        if (areAllZoneStagesCleared("1", $clearedStages)) {
            zone2Unlocked = true;
        } else if (areAllZoneStagesCleared("2", $clearedStages)) {
            zone3Unlocked = true;
        }
    }

    // TODO: add half transparent image of the stage of the respective zone to the background

    const handleStageSelection = (stage: string) => {
        selectedStage = STAGE_LIST[stage];
        enemyPreviewList = ENEMY_PREVIEW_LIST[selectedStage];
    };
    const handleZoneSelection = (zone: number) => {
        enemyPreviewList = [];
        selectedZone = zone;
        selectedStage = "";
        zonePreviewImage = `url("zonePreviews/map${selectedZone}.png")`;
        switch (zone) {
            case 1:
                enemySpawnPointText = "Enemy spawn point: Bottom";
                break;
            case 2:
                enemySpawnPointText = "Enemy spawn point: Left & Top";
                break;
            case 3:
                enemySpawnPointText = "";
                break;
            default:
                break;
        }
    };

    const startExpedition = (stage: string) => {
        dispatch("startExpedition", stage);
    };
</script>

<div class="flex flex-row justify-around">
    <button
        class="rpgui-button {selectedZone === ZONES.ONE ? 'selected' : ''}"
        type="button"
        on:click={() => handleZoneSelection(1)}
    >
        Zone 1
    </button>
    <button
        class="rpgui-button {selectedZone === ZONES.TWO ? 'selected' : ''}"
        type="button"
        disabled={!zone2Unlocked}
        on:click={() => handleZoneSelection(2)}
    >
        Zone 2
    </button>
    <button
        class="rpgui-button {selectedZone === ZONES.THREE ? 'selected' : ''}"
        type="button"
        disabled={!zone3Unlocked}
        on:click={() => handleZoneSelection(3)}
    >
        Zone 3
    </button>
</div>

<div class="flex h-5/6">
    <div class="flex flex-col justify-around flex-grow h-5/6">
        {#if selectedZone === ZONES.ONE}
            {#each zone1 as stage}
                <div class="flex flex-row items-center">
                    <button
                        class=" w-10 rpgui-button {selectedStage ===
                        STAGE_LIST[stage]
                            ? 'selected'
                            : ''}"
                        type="button"
                        on:click={() => handleStageSelection(stage)}
                    >
                        {stage}
                    </button>
                    {#if $clearedStages[STAGE_LIST[stage]]}
                        <div class="w-5 h-5 ml-2 bg-greenCheckmark" />
                    {/if}
                </div>
            {/each}
        {:else if selectedZone === ZONES.TWO}
            {#each zone2 as stage}
                <div class="flex flex-row items-center">
                    <button
                        class="w-10 rpgui-button {selectedStage ===
                        STAGE_LIST[stage]
                            ? 'selected'
                            : ''}"
                        type="button"
                        on:click={() => handleStageSelection(stage)}
                    >
                        {stage}
                    </button>
                    {#if $clearedStages[STAGE_LIST[stage]]}
                        <div class="w-5 h-5 ml-2 bg-greenCheckmark" />
                    {/if}
                </div>
            {/each}
        {:else if selectedZone === ZONES.THREE}
            {#each zone3 as stage}
                <div class="flex flex-row items-center">
                    <button
                        class="w-10 rpgui-button {selectedStage ===
                        STAGE_LIST[stage]
                            ? 'selected'
                            : ''}"
                        style=""
                        type="button"
                        on:click={() => handleStageSelection(stage)}
                    >
                        {stage}
                    </button>
                    {#if $clearedStages[STAGE_LIST[stage]]}
                        <div class="w-5 h-5 ml-2 bg-greenCheckmark" />
                    {/if}
                </div>
            {/each}
        {/if}
    </div>
    {#if enemyPreviewList.length > 0}
        <StagePreview {enemyPreviewList} {selectedStage} {startExpedition} />
    {:else if selectedZone > 0}
        {#if selectedZone === 3} work in progress {/if}
        <div
            class="flex flex-col items-center justify-center w-4/6 mt-5 -ml-5 h-5/6"
        >
            {#if selectedZone === 2}
                stages 2-3, 2-4, 2-5 are work in progress
            {/if}
            <div
                class="opacity-80"
                style="
                    background-image: {zonePreviewImage};
                    background-size: cover; 
                    border: 2px solid;
                    width: 70%;
                    height: 70%;
                "
            />
            <div
                class="text-red-700"
                style="margin-top: 20px; margin-bottom: 20px;"
            >
                {enemySpawnPointText}
            </div>
            <p class="my-2">All clear reward:</p>
            {#each ALL_CLEAR_REWARDS[selectedZone] as reward}
                <p>{reward}</p>
            {/each}
        </div>
    {/if}
</div>

<style>
    .selected {
        background-image: url("../img/button-down.png");
    }
</style>
