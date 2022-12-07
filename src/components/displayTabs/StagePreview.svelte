<script lang="ts">
    import type { ISprite } from "~/interfaces/military/sprite";
    import FramedSprite from "../military/FramedSprite.svelte";
    import InfoBoxButton from "../infoBoxes/InfoBoxButton.svelte";
    import {
        BUTTON_CATEGORIES,
        BUTTON_WIDTH,
    } from "~/constants/buttons/buttons";
    import { INFO_BOX_TYPES } from "~/constants/infoBoxes";

    export let enemyPreviewList: { sprite: ISprite; amount: number }[] = [];
</script>

<div class="w-4/6 h-5/6">
    <p class="my-5 text-center">Enemy List</p>
    <!-- Enemy list -->
    <div class="flex flex-row flex-wrap justify-center">
        {#each enemyPreviewList as enemy}
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
        {/each}
    </div>
</div>

<style>
    .w-140px {
        width: 140px;
    }
    .whitespace-nowrap {
        white-space: nowrap;
    }
</style>
