<script lang="ts">
    import { researchedSciences } from "~/store/gameState";
    import { completedCollections } from "~/store/library";
    import { militaryUnitList, selectedMilitaryUnits } from "~/store/military";
    import { displayUnit, getSprite } from "~/utils/helpers";
    import DeployableUnit from "../military/DeployableUnit.svelte";
    import FramedSprite from "../military/FramedSprite.svelte";
    let unitList = $militaryUnitList;
    $: unitList = $militaryUnitList;

    $: isSelected = (type: string) => {
        return $selectedMilitaryUnits.includes(type);
    };
</script>

<div class="flex flex-row justify-between mt-5">
    <div class="flex flex-row flex-wrap justify-around w-4/6">
        {#each Object.entries(unitList) as [key, unit]}
            {#if displayUnit(unit.type, $researchedSciences, $completedCollections)}
                <div class="flex flex-col m-4">
                    <div class="m-auto">
                        <FramedSprite
                            sprite={getSprite(unit.type)}
                            shouldAnimateSprite={false}
                        />
                    </div>
                    {#if isSelected(unit.type)}
                        <button
                            class="w-150px rpgui-button button-width"
                            on:click={() => {
                                selectedMilitaryUnits.removeUnit(unit.type);
                            }}
                        >
                            <p>Remove</p>
                        </button>
                    {:else}
                        <button
                            class="rpgui-button w-150px {$selectedMilitaryUnits.length ===
                            4
                                ? 'disabled'
                                : ''}"
                            disabled={$selectedMilitaryUnits.length === 4}
                            on:click={() =>
                                selectedMilitaryUnits.addUnit(unit.type)}
                        >
                            <p>Add</p>
                        </button>
                    {/if}
                </div>
            {/if}
        {/each}
    </div>

    <div class="relative right-250px">
        <div class="fixed flex flex-col ml-3">
            <div class="flex flex-col mb-3 text-center h-52px">
                <p>Selected Units:</p>
                <p>{$selectedMilitaryUnits.length} / 4</p>
            </div>
            {#if $selectedMilitaryUnits.length > 0}
                <div class="relative p-2 rpgui-container framed-golden">
                    {#each $selectedMilitaryUnits as type}
                        <div
                            class="flex items-center justify-center m-auto my-1 button-style"
                        >
                            <FramedSprite
                                isSmallFrame={true}
                                sprite={getSprite(type)}
                                shouldAnimateSprite={false}
                            />
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .button-style {
        overflow: hidden;
        background: url(img/button-golden.png) center no-repeat no-repeat;
        background-clip: padding-box;
        background-origin: padding-box;
        background-size: 100% 100%;
        font-size: 1em;
        width: 130px;
        height: 70px;
    }
    .right-250px {
        right: 250px;
    }
    .w-150px {
        width: 150px;
    }
    .my-1 {
        margin-top: 0.25rem !important;
        margin-bottom: 0.25rem !important;
    }
</style>
