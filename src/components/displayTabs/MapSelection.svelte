<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { STAGE_LIST } from "~/constants/military/stageList";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { clearedStages } from "~/store/military";
    import {
        areAllZoneStagesCleared,
        generatePreviewList,
    } from "~/utils/helpers";
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
    let zone2Unlocked: boolean = false;
    let zone3Unlocked: boolean = false;
    let enemyPreviewList: { sprite: ISprite; amount: number }[] = [];
    const dispatch = createEventDispatcher();

    for (let stageNo = 1; stageNo <= 5; stageNo++) {
        zone1.push(`1-${stageNo}`);
    }
    for (let stageNo = 1; stageNo <= 5; stageNo++) {
        zone2.push(`2-${stageNo+1}`);
    }
    $: {
        if (areAllZoneStagesCleared("1", $clearedStages)) {
            zone2Unlocked = true;
        } else if (areAllZoneStagesCleared("2", $clearedStages)) {
            zone3Unlocked = true;
        }
    }

    const handleStageSelection = (stage: string) => {
        selectedStage = STAGE_LIST[stage];
        enemyPreviewList = generatePreviewList(selectedStage);
    };
    const handleZoneSelection = (zone: number) => {
        enemyPreviewList = [];
        selectedZone = zone;
        selectedStage = "";
        zonePreviewImage = `url("zonePreviews/map${selectedZone}.png")`;
    };
    const previousStageCleared = (stage: string) => {
        const stageNumber = parseInt(stage.substring(2, 3));
        if (stageNumber === 1) return true;
        const previousStage = stage.substring(0, 2) + (stageNumber - 1);
        return $clearedStages[STAGE_LIST[previousStage]];
    };

    const startExpedition = (stage: string) => {
        dispatch("startExpedition", stage);
    };
</script>

<!-- Zone selection -->
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
<!-- Stage selection -->
<div class="flex justify-between h-5/6">
    <div class="flex flex-col justify-around h-5/6">
        {#if selectedZone === ZONES.ONE}
            {#each zone1 as stage}
                <div
                    class="flex flex-row items-center {previousStageCleared(
                        stage
                    )
                        ? ''
                        : 'invisible'}"
                >
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
                <div
                    class="flex flex-row items-center {previousStageCleared(
                        stage
                    )
                        ? ''
                        : 'invisible'}"
                >
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
                <div
                    class="flex flex-row items-center {previousStageCleared(
                        stage
                    )
                        ? ''
                        : 'invisible'}"
                >
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

        {#if enemyPreviewList.length > 0}
            <div class="absolute flex w-4/6 bottom-5">
                <button
                    class="w-20 h-20 mr-5 rpgui-button"
                    type="button"
                    on:click={() => {
                        startExpedition(selectedStage);
                    }}
                >
                    <p class="text-green">START</p>
                </button>
            </div>
        {/if}
    </div>
    {#if enemyPreviewList.length > 0}
        <StagePreview {enemyPreviewList} />
    {:else if selectedZone > 0}
        {#if selectedZone === 3} work in progress {/if}
        <div class="flex flex-col items-center justify-center w-4/6 mt-5">
            <div
                class="opacity-80 min-preview-size -ml-60px"
                style="
                    background-image: {zonePreviewImage};
                    background-size: cover; 
                    border: 2px solid;
                    width: 80%;
                    height: 80%;
                "
            />
        </div>
    {/if}
</div>

<style>
    .selected {
        background-image: url("../img/button-down.png");
    }
    .min-preview-size {
        min-width: 576px;
        min-height: 448px;
    }
    .-ml-60px {
        margin-left: -60px !important;
    }
    .invisible {
        visibility: hidden;
    }
</style>
