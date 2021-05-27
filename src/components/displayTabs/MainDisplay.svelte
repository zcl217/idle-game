<script lang="ts">
    import InfoBoxButton from "../InfoBoxButton.svelte";
    import CharacterFrame from "../CharacterFrame.svelte";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import {
        BUTTON_WIDTH,
        BUTTON_CATEGORIES,
    } from "~/constants/buttons/buttons";
    import { DIALOGUES, STORY_PROGRESS_LIST } from "~/constants/story";
    import { displayDialogueBox, updateDialogue } from "~/store/dialogue";
    import { resources } from "~/store/resources.js";
    import { empireButtonCosts } from "~/store/buttonCosts";
    import {
        playerImage,
        playerName,
        researchedSciences,
        obtainedResources,
        curStoryProgress,
    } from "~/store/gameState.js";
    import { buttonPrereqsMet } from "~/utils/helpers";
    import {
        EMPIRE_BUTTON_TEXTS,
        EMPIRE_BUTTON_TYPES,
        EMPIRE_COST_MULTIPLIERS,
    } from "~/constants/buttons/empireButtons";

    const handleResource = (buttonType: string) => {
        switch (buttonType) {
            case EMPIRE_BUTTON_TYPES.GATHER_FOOD:
                gatherFoodHandler();
                break;
            case EMPIRE_BUTTON_TYPES.GATHER_WOOD:
                gatherWoodHandler();
                break;
            case EMPIRE_BUTTON_TYPES.CREATE_FARM:
                createFarmHandler(buttonType);
                break;
            case EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM:
                createTreeFarmHandler(buttonType);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_STORAGE:
                buildStorageHandler(buttonType);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE:
                buildAttractiveHouseHandler(buttonType);
                break;
            default:
                break;
        }
    };
    const gatherFoodHandler = () => {
        curStoryProgress.set(STORY_PROGRESS_LIST['A2S1']);
        updateDialogue(DIALOGUES[$curStoryProgress]);
        displayDialogueBox.set(true);

        const food = RESOURCE_TYPES.FOOD;
        resources.updateResourceValue(food, $resources[food].value + 10);
        obtainedResources.add(RESOURCE_TYPES.FOOD);
    };

    const createFarmHandler = (buttonType: string) => {
        const farms = RESOURCE_TYPES.FARMS;
        if (!hasEnoughResources(buttonType)) return;
        spendResources(buttonType);
        resources.updateResourceValue(farms, $resources[farms].value + 1);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            EMPIRE_COST_MULTIPLIERS[buttonType]
        );
        obtainedResources.add(RESOURCE_TYPES.FARMS);
    };

    const gatherWoodHandler = () => {
        const wood = RESOURCE_TYPES.WOOD;
        resources.updateResourceValue(wood, $resources[wood].value + 100);
        obtainedResources.add(RESOURCE_TYPES.WOOD);
    };

    const buildStorageHandler = (buttonType: string) => {
        const storage = RESOURCE_TYPES.STORAGE;
        if (!hasEnoughResources(buttonType)) return;
        spendResources(buttonType);
        resources.updateResourceValue(storage, $resources[storage].value + 1);
        const food = RESOURCE_TYPES.FOOD;
        resources.updateResourceLimit(food, $resources[food].limit + 100);
        const wood = RESOURCE_TYPES.WOOD;
        resources.updateResourceLimit(wood, $resources[wood].limit + 100);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            EMPIRE_COST_MULTIPLIERS[buttonType]
        );
        obtainedResources.add(RESOURCE_TYPES.STORAGE);
    };

    const createTreeFarmHandler = (buttonType: string) => {
        const treeFarm = RESOURCE_TYPES.TREE_FARM;
        if (!hasEnoughResources(buttonType)) return;
        spendResources(buttonType);
        resources.updateResourceValue(treeFarm, $resources[treeFarm].value + 1);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            EMPIRE_COST_MULTIPLIERS[buttonType]
        );
        obtainedResources.add(RESOURCE_TYPES.TREE_FARM);
    };

    const buildAttractiveHouseHandler = (buttonType: string) => {
        const attractiveHouse = RESOURCE_TYPES.ATTRACTIVE_HOUSE;
        if (!hasEnoughResources(buttonType)) return;
        spendResources(buttonType);
        resources.updateResourceValue(attractiveHouse, $resources[attractiveHouse].value + 1);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            EMPIRE_COST_MULTIPLIERS[buttonType]
        );
        setTimeout(() => {
            //trigger dialogue
            // bug right now:
            /* 1. loop running several times if we spam click buttons
            not sure how we fixed this last time
            */
            const nextScene = STORY_PROGRESS_LIST['A1S1'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
            displayDialogueBox.set(true);
        }, 3);
        obtainedResources.add(RESOURCE_TYPES.ATTRACTIVE_HOUSE);
    };

    const hasEnoughResources = (buttonType: string) => {
        for (let resource of $empireButtonCosts[buttonType]) {
            const curResourceAmount = $resources[resource.type].value;
            if (curResourceAmount < resource.cost) return false;
        }
        return true;
    };

    const spendResources = (buttonType: string) => {
        for (let resource of $empireButtonCosts[buttonType]) {
            const curResourceAmount = $resources[resource.type].value;
            resources.updateResourceValue(
                resource.type,
                curResourceAmount - resource.cost
            );
        }
    };
</script>

<!-- <CharacterFrame characterImage={$playerImage} characterName={$playerName} /> -->
<div class="flex flex-wrap">
    {#key $obtainedResources}
        {#each Object.entries(EMPIRE_BUTTON_TYPES) as [key, id]}
            {#if buttonPrereqsMet(id, BUTTON_CATEGORIES.EMPIRE)}
                <InfoBoxButton
                    width={BUTTON_WIDTH}
                    curButtonType={id}
                    curButtonCategory={BUTTON_CATEGORIES.EMPIRE}
                    handler={() => {
                        handleResource(id);
                    }}
                />
            {/if}
        {/each}
    {/key}
</div>
