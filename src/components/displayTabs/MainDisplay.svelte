<script lang="ts">
    import InfoBoxButton from "../InfoBoxButton.svelte";
    import CharacterFrame from "../CharacterFrame.svelte";
    import { resourceTypes } from "~/constants/resourceTypes";
    import { BUTTON_WIDTH, BUTTON_CATEGORIES } from "~/constants/buttons/buttons";
    import dialogues from "~/constants/dialogueTextAndHandlers";
    import { displayDialogueBox, updateDialogue } from "~/store/dialogue";
    import { resources } from "~/store/resources.js";
    import { empireButtonCosts } from "~/store/buttonCosts";
    import {
        playerImage,
        playerName,
        scene,
        getCurActScene,
        researchedSciences,
        obtainedResources,
    } from "~/store/gameState.js";
    import { buttonPrereqsMet } from "~/utils/helpers";
    import {
        empireButtonTexts,
        empireButtonTypes,
        empireCostMultipliers,
    } from "~/constants/buttons/empireButtons";

    const handleResource = (buttonType: string) => {
        switch (buttonType) {
            case empireButtonTypes.GATHER_FOOD:
                gatherFoodHandler();
                break;
            case empireButtonTypes.GATHER_WOOD:
                gatherWoodHandler();
                break;
            case empireButtonTypes.CREATE_FARM:
                createFarmHandler(buttonType);
                break;
            case empireButtonTypes.CREATE_TREE_FARM:
                createTreeFarmHandler(buttonType);
                break;
            case empireButtonTypes.BUILD_STORAGE:
                buildStorageHandler(buttonType);
                break;
            case empireButtonTypes.BUILD_ATTRACTIVE_HOUSE:
                buildAttractiveHouseHandler(buttonType);
                break;
            default:
                break;
        }
    };
    const gatherFoodHandler = () => {
        const food = resourceTypes.FOOD;
        resources.updateResourceValue(food, $resources[food].value + 10);
        obtainedResources.add(resourceTypes.FOOD);
    };

    const createFarmHandler = (buttonType: string) => {
        const farms = resourceTypes.FARMS;
        if (!hasEnoughResources(buttonType)) return;
        spendResources(buttonType);
        resources.updateResourceValue(farms, $resources[farms].value + 1);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            empireCostMultipliers[buttonType]
        );
        obtainedResources.add(resourceTypes.FARMS);
    };

    const gatherWoodHandler = () => {
        const wood = resourceTypes.WOOD;
        resources.updateResourceValue(wood, $resources[wood].value + 100);
        obtainedResources.add(resourceTypes.WOOD);
    };

    const buildStorageHandler = (buttonType: string) => {
        const storage = resourceTypes.STORAGE;
        if (!hasEnoughResources(buttonType)) return;
        spendResources(buttonType);
        resources.updateResourceValue(storage, $resources[storage].value + 1);
        const food = resourceTypes.FOOD;
        resources.updateResourceLimit(food, $resources[food].limit + 100);
        const wood = resourceTypes.WOOD;
        resources.updateResourceLimit(wood, $resources[wood].limit + 100);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            empireCostMultipliers[buttonType]
        );
        obtainedResources.add(resourceTypes.STORAGE);
    };

    const createTreeFarmHandler = (buttonType: string) => {
        const treeFarm = resourceTypes.TREE_FARM;
        if (!hasEnoughResources(buttonType)) return;
        spendResources(buttonType);
        resources.updateResourceValue(treeFarm, $resources[treeFarm].value + 1);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            empireCostMultipliers[buttonType]
        );
        obtainedResources.add(resourceTypes.TREE_FARM);
    };

    const buildAttractiveHouseHandler = (buttonType: string) => {
        const house = resourceTypes.ATTRACTIVE_HOUSE;
        if (!hasEnoughResources(buttonType)) return;
        spendResources(buttonType);
        resources.updateResourceValue(house, $resources[house].value + 1);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            empireCostMultipliers[buttonType]
        );
        setTimeout(() => {
            //trigger dailogue
            // bug right now:
            /* 1. loop running several times if we spam click buttons
            not sure how we fixed this last time
            */
            if ($scene === "0") {
                scene.set("1");
                const curScene = getCurActScene();
                updateDialogue(dialogues[curScene]);
            }
            displayDialogueBox.set(true);
        }, 3);
        obtainedResources.add(resourceTypes.ATTRACTIVE_HOUSE);
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

<CharacterFrame characterImage={$playerImage} characterName={$playerName} />
<div class="flex flex-wrap">
    {#key $obtainedResources}
        {#each Object.entries(empireButtonTypes) as [key, id]}
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
