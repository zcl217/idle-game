<script lang="ts">
    import type { ISprite } from "~/interfaces/military/sprite";
    import FramedSprite from "../military/FramedSprite.svelte";
    import { RESOURCE_NAMES } from "~/constants/resources/resourceTypes";
    import { STAGE_REWARD_LIST } from "~/constants/military/stageList";
    import Sprite from "../military/Sprite.svelte";
    import InfoBoxButton from "../infoBoxes/InfoBoxButton.svelte";
    import {
        BUTTON_CATEGORIES,
        BUTTON_WIDTH,
    } from "~/constants/buttons/buttons";
    import { INFO_BOX_TYPES } from "~/constants/infoBoxes";

    export let enemyPreviewList: { sprite: ISprite; amount: number }[] = [],
        selectedStage = "",
        startExpedition: Function;
</script>

<div class="w-4/6 h-5/6">
    <p class="my-5 text-center">Enemy List</p>
    <div class="flex flex-row flex-wrap">
        {#each enemyPreviewList as enemy}
            {#if false}
                <p>?</p>
            {:else}
                <div class="flex flex-row py-1">
                    <div class="flex flex-col">
                        <div class="flex flex-row">
                            <div class="flex justify-center w-140px">
                                <FramedSprite
                                    sprite={enemy.sprite}
                                    shouldAnimateSprite={false}
                                />
                            </div>
                            <p
                                class="flex items-center ml-5 mr-5 font-bold w-14 whitespace-nowrap"
                            >
                                x {enemy.amount}
                            </p>
                        </div>
                        {#if enemy.sprite.spriteInfo.specialAbility}
                            <InfoBoxButton
                                width={BUTTON_WIDTH}
                                curButtonType={enemy.sprite.spriteInfo
                                    .specialAbility}
                                curButtonCategory={BUTTON_CATEGORIES.EXPEDITION}
                                infoBoxButtonType={INFO_BOX_TYPES.ABILITY}
                            />
                        {/if}
                    </div>
                </div>
            {/if}
        {/each}
    </div>
    <div class="absolute flex justify-end w-4/6 bottom-5">
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

<style>
    .w-140px {
        width: 140px;
    }
    .whitespace-nowrap {
        white-space: nowrap;
    }
    .justify-end {
        justify-content: flex-end;
    }
</style>
