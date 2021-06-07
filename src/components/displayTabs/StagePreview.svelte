<script lang="ts">
    import type { ISprite } from "~/interfaces/military/sprite";
    import FramedSprite from "../military/FramedSprite.svelte";
    import { RESOURCE_NAMES } from "~/constants/resources/resourceTypes";
    import { STAGE_REWARD_LIST } from "~/constants/military/stageList";

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
                <div class="flex py-1">
                    <FramedSprite sprite={enemy.sprite} />
                    <p class="flex items-center ml-5 mr-5 font-bold w-14">
                        x {enemy.amount}
                    </p>
                </div>
            {/if}
        {/each}
    </div>
    <div class="flex">
        <div class="absolute flex justify-between w-4/6 bottom-5">
            <div class="w-2/3 pr-3 bottom-10">
                <p>Resources generated</p>
                <div class="flex flex-row flex-wrap justify-between">
                    {#each STAGE_REWARD_LIST[selectedStage] as reward}
                        <p class="flex-basis" style="flex-basis: 50%">
                            {#if reward.amountPerSecond > 0}
                                {RESOURCE_NAMES[reward.resourceType]}: {reward.amountPerSecond}/s
                            {/if}
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
