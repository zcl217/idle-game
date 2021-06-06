<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {
        ENEMY_PREVIEW_LIST,
        STAGE_LIST,
        STAGE_REWARD_LIST,
    } from "~/constants/military/stageList";
    import { RESOURCE_NAMES } from "~/constants/resources/resourceTypes";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { clearedStages } from "~/store/military";
    import FramedSprite from "../military/FramedSprite.svelte";
    import Sprite from "../military/Sprite.svelte";

    const ZONES = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
    };

    let selectedZone = 0;
    let selectedStage = '';
    const zone1: string[] = [];
    const zone2: string[] = [];
    const zone3: string[] = [];
    let zone2Unlocked: boolean = false;
    let zone3Unlocked: boolean = false;
    let enemyPreviewList: { sprite: ISprite; amount: number }[] = [];
    let enemySpawnPointText = "Enemy spawn point: Bottom";
    const dispatch = createEventDispatcher();

    for (let a = 0; a < 3; a++) {
        zone1.push("1");
        zone2.push("2");
        zone3.push("3");
    }
    for (let a = 3; a > 0; a--) {
        zone1[a - 1] += `-${a}`;
        zone2[a - 1] += `-${a}`;
        zone3[a - 1] += `-${a}`;
    }

    $: {
        if ($clearedStages[STAGE_LIST["1-3"]]) {
            zone2Unlocked = true;
        } else if ($clearedStages[STAGE_LIST["2-3"]]) {
            zone3Unlocked = true;
        }
    }

    // TODO: add half transparent image of the stage of the respective zone to the background

    const handleStageSelection = (stage: string) => {
        selectedStage = STAGE_LIST[stage];
        enemyPreviewList = ENEMY_PREVIEW_LIST[selectedStage];
    };

    const handleZoneSelection = (zone: number) => {
        selectedZone = zone;
        enemyPreviewList = [];
        console.log(enemyPreviewList);
        switch (zone) {
            case 1:
                enemySpawnPointText = "Enemy spawn point: Bottom";
                break;
            case 2:
                enemySpawnPointText = "";
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
                {#if $clearedStages[stage]}
                    <div class="text-green-600">Clear!</div>
                {/if}
            {/each}
        {:else if selectedZone === ZONES.THREE}
            {#each zone3 as stage}
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
                {#if $clearedStages[stage]}
                    <div class="text-green-600">Clear!</div>
                {/if}
            {/each}
        {/if}
    </div>
    {#if enemyPreviewList.length > 0}
        <div class="w-4/6 h-5/6">
            <p class="my-5 text-center">Enemy List</p>
            <div class="flex flex-row flex-wrap">
                {#each enemyPreviewList as enemy}
                    {#if false}
                        <p>?</p>
                    {:else}
                        <div class="flex py-1">
                            <FramedSprite sprite={enemy.sprite} />
                            <p
                                class="flex items-center ml-5 mr-5 font-bold w-14"
                            >
                                x {enemy.amount}
                            </p>
                        </div>
                    {/if}
                {/each}
            </div>
            <div class="flex">
                <div class="absolute text-red-700 bottom-28">
                    {enemySpawnPointText}
                </div>
                <div class="absolute flex justify-between w-4/6 bottom-5">
                    <div class="w-2/3 pr-3 bottom-10">
                        <p>Resources generated</p>
                        <div class="flex flex-row flex-wrap justify-between">
                            {#each STAGE_REWARD_LIST[selectedStage] as reward}
                                <p class="flex-basis" style="flex-basis: 50%">
                                    {RESOURCE_NAMES[reward.resource]}: {reward.amountPerSecond}/s
                                </p>
                            {/each}
                        </div>
                    </div>
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
            </div>
        </div>
    {/if}
</div>

<style>
    .selected {
        background-image: url("img/button-down.png");
    }
</style>
