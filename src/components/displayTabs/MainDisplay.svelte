<script lang="ts">
    import InfoBoxButton from "~/components/infoBoxes/InfoBoxButton.svelte";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import {
        BUTTON_WIDTH,
        BUTTON_CATEGORIES,
    } from "~/constants/buttons/buttons";
    import { DIALOGUES, STORY_PROGRESS_LIST } from "~/constants/story";
    import { displayDialogueBox, updateDialogue } from "~/store/dialogue";
    import { obtainedResources, resources } from "~/store/resources";
    import { empireButtonCosts } from "~/store/buttonCosts";
    import { curStoryProgress } from "~/store/gameState";
    import { buttonPrereqsMet } from "~/utils/helpers";
    import {
        BUTTON_RESOURCE_MAPPING,
        EMPIRE_BUTTON_TYPES,
    } from "~/constants/buttons/empireButtons";
    import { GATHER_FOOD_AMOUNT, GATHER_WOOD_AMOUNT, CAPACITIES } from "~/constants/gameState";
    import {
        hasEnoughResources,
        spendResources,
    } from "~/utils/resourceHelpers";

    let buttonsToDisplay: Set<string> = new Set();

    $: {
        $obtainedResources;
        let oldLength = buttonsToDisplay.size;
        for (let [key, id] of Object.entries(EMPIRE_BUTTON_TYPES)) {
            if (buttonPrereqsMet(id, BUTTON_CATEGORIES.EMPIRE)) {
                buttonsToDisplay.add(id);
            }
        }
        if (buttonsToDisplay.size !== oldLength)
            buttonsToDisplay = buttonsToDisplay;
    }

    const handleResource = (buttonType: string) => {
        const resourceType = BUTTON_RESOURCE_MAPPING[buttonType];
        if (
            buttonType === EMPIRE_BUTTON_TYPES.GATHER_FOOD ||
            buttonType === EMPIRE_BUTTON_TYPES.GATHER_WOOD
        ) {
            gatherResource(resourceType);
            return;
        }
        if (!createBuilding(buttonType, resourceType)) return;
        switch (buttonType) {
            case EMPIRE_BUTTON_TYPES.BUILD_STORAGE:
                incrementResourceLimits(CAPACITIES.STORAGE);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE:
                buildAttractiveHouseHandler();
                break;
            default:
                break;
        }
    };
    const gatherResource = (type: string) => {
        let amount = 0;
        switch(type) {
            case RESOURCE_TYPES.FOOD:
                amount = GATHER_FOOD_AMOUNT;
                break;
            case RESOURCE_TYPES.WOOD:
                amount = GATHER_WOOD_AMOUNT;
                break;
            default:
                break;
        }
        resources.incrementResourceValue(type, amount);
        obtainedResources.add(type);
    };
    const createBuilding = (
        buttonType: string,
        resourceType: string
    ): boolean => {
        if (!hasEnoughResources($empireButtonCosts, $resources, buttonType))
            return false;
        spendResources($empireButtonCosts, resources, buttonType);
        resources.incrementResourceValue(resourceType, 1);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            $resources[resourceType].value
        );
        obtainedResources.add(resourceType);
        return true;
    };
    const incrementResourceLimits = (payload: number) => {
        for (let [name, resource] of Object.entries($resources)) {
            if (resource.limit < Number.MAX_VALUE - 5000) {
                resources.setResourceLimit(
                    name,
                    $resources[name].limit + payload
                );
            }
        }
    };
    const buildAttractiveHouseHandler = () => {
        setTimeout(() => {
            if ($curStoryProgress !== STORY_PROGRESS_LIST["A1S3"]) {
                const nextScene = STORY_PROGRESS_LIST["A1S1"];
                curStoryProgress.set(nextScene);
                updateDialogue(DIALOGUES[nextScene]);
            }
            displayDialogueBox.set(true);
        }, 3);
        obtainedResources.add(RESOURCE_TYPES.ATTRACTIVE_HOUSE);
    };
</script>

<!-- <CharacterFrame characterImage={$playerImage} characterName={$playerName} /> -->
<div class="container flex flex-wrap justify-around">
    {#each [...buttonsToDisplay] as id}
        <div class="flex justify-center">
            <InfoBoxButton
                width={BUTTON_WIDTH}
                curButtonType={id}
                curButtonCategory={BUTTON_CATEGORIES.EMPIRE}
                handler={() => {
                    handleResource(id);
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
