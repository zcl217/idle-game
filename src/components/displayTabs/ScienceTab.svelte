<script lang="ts">
    import InfoBoxButton from "~/components/infoBoxes/InfoBoxButton.svelte";
    import {
        BUTTON_CATEGORIES,
        BUTTON_WIDTH,
    } from "~/constants/buttons/buttons";
    import {
        SCIENCE_BUTTON_COSTS,
        SCIENCE_BUTTON_TYPES,
        SCIENCE_UNIT_MAP,
    } from "~/constants/buttons/scienceButtons";
    import { researchedSciences } from "~/store/gameState";
    import { buttonPrereqsMet } from "~/utils/helpers";
    import { resources } from "~/store/resources";
    import {
        hasEnoughResources,
        spendResources,
    } from "~/utils/resourceHelpers";
    import { selectedMilitaryUnits } from "~/store/military";

    let buttonsToDisplay: Set<string> = new Set();
    $: {
        buttonsToDisplay = new Set();
        let oldLength = buttonsToDisplay.size;
        for (let [key, id] of Object.entries(SCIENCE_BUTTON_TYPES)) {
            if ($researchedSciences.has(id)) continue;
            if (buttonPrereqsMet(id, BUTTON_CATEGORIES.SCIENCE)) {
                buttonsToDisplay.add(id);
            }
        }
    }

    const handleResearch = (science: string) => {
        if (!hasEnoughResources(SCIENCE_BUTTON_COSTS, $resources, science))
            return;
        spendResources(SCIENCE_BUTTON_COSTS, resources, science);
        researchedSciences.update((list: Set<string>) => list.add(science));
        if ($selectedMilitaryUnits.length >= 4) return;
        // if the research is military unit related, we add it to the selected units
        if (SCIENCE_UNIT_MAP[science])
          $selectedMilitaryUnits.push(SCIENCE_UNIT_MAP[science])
    };
</script>

<h1 class="text-center">Available Research</h1>
<!-- Science buttons -->
<div class="container flex flex-wrap justify-around">
    {#each [...buttonsToDisplay] as id}
        <div class="flex justify-center">
            <InfoBoxButton
                width={BUTTON_WIDTH}
                curButtonType={id}
                curButtonCategory={BUTTON_CATEGORIES.SCIENCE}
                handler={() => {
                    handleResearch(id);
                }}
            />
        </div>
    {/each}
    {#if buttonsToDisplay.size % 2 !== 0}
        <div />
    {/if}
</div>

<style>
    .container > * {
        flex: 50%;
    }
</style>
