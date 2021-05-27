<script lang="ts">
    import InfoBoxButton from "../InfoBoxButton.svelte";
    import CharacterFrame from "../CharacterFrame.svelte";
    import { resourceTypes } from "~/constants/resourceTypes";
    import { BUTTON_CATEGORIES, BUTTON_WIDTH } from "~/constants/buttons/buttons";
    import dialogues from "~/constants/dialogueTextAndHandlers";
    import { displayDialogueBox, updateDialogue } from "~/store/dialogue";
    import { resources } from "~/store/resources.js";
    import {
        playerImage,
        playerName,
        scene,
        getCurActScene,
        obtainedResources,
    } from "~/store/gameState.js";
    import {
        empireButtonTypes,
        empireCostMultipliers,
    } from "~/constants/buttons/empireButtons";
    import { empireButtonCosts } from "~/store/buttonCosts";
import { buttonPrereqsMet } from "~/utils/helpers";

    const handleResource = (buttonType: string) => {
        switch(buttonType) {
            case empireButtonTypes.BUILD_HOUSE:
                break;
            default:
                break;
        }
    }

    const buildHouseHandler = (buttonType: string) => {
        const homes = resourceTypes.HOMES;
        if (!hasEnoughResources(buttonType)) return;
        spendResources(buttonType);
        resources.updateResourceValue(homes, $resources[homes].value + 1);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            empireCostMultipliers[buttonType]
        );
        obtainedResources.add(resourceTypes.HOMES);
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
    <InfoBoxButton
        width={BUTTON_WIDTH}
        curButtonCategory={BUTTON_CATEGORIES.EMPIRE}
        curButtonType={empireButtonTypes.BUILD_HOUSE}
        handler={buildHouseHandler}
    />
    {#if $resources[resourceTypes.WOOD].display}
        <InfoBoxButton
            width={BUTTON_WIDTH}
            curButtonType={empireButtonTypes.GATHER_WOOD}
            handler={{}}
        />
    {/if}
    {#if $resources[resourceTypes.FARMS].display}
        <InfoBoxButton
            width={BUTTON_WIDTH}
            curButtonType={empireButtonTypes.CREATE_FARM}
            handler={{}}
        />
    {/if}
    {#if $resources[resourceTypes.FARMS].value > 1}
        <InfoBoxButton
            width={BUTTON_WIDTH}
            curButtonType={empireButtonTypes.CREATE_TREE_FARM}
            handler={createTreeFarmHandler}
        />
    {/if}
    {#if $resources[resourceTypes.FARMS].value > 2}
        <InfoBoxButton
            width={BUTTON_WIDTH}
            curButtonType={empireButtonTypes.BUILD_STORAGE}
            handler={buildStorageHandler}
        />
    {/if}
</div>
