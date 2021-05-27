<script lang="ts">
    import InfoBoxButton from "../InfoBoxButton.svelte";
    import CharacterFrame from "../CharacterFrame.svelte";
    import { RESOURCE_TYPES } from "~/constants/resourceTypes";
    import { BUTTON_CATEGORIES, BUTTON_WIDTH } from "~/constants/buttons/buttons";
    import DIALOGUES from "~/constants/dialogueTextAndHandlers";
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
        EMPIRE_BUTTON_TYPES,
        EMPIRE_COST_MULTIPLIERS,
    } from "~/constants/buttons/empireButtons";
    import { empireButtonCosts } from "~/store/buttonCosts";
import { buttonPrereqsMet } from "~/utils/helpers";

    const handleResource = (buttonType: string) => {
        switch(buttonType) {
            case EMPIRE_BUTTON_TYPES.BUILD_HOUSE:
                break;
            default:
                break;
        }
    }

    const buildHouseHandler = (buttonType: string) => {
        const homes = RESOURCE_TYPES.HOMES;
        if (!hasEnoughResources(buttonType)) return;
        spendResources(buttonType);
        resources.updateResourceValue(homes, $resources[homes].value + 1);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            EMPIRE_COST_MULTIPLIERS[buttonType]
        );
        obtainedResources.add(RESOURCE_TYPES.HOMES);
    };

    const gatherFoodHandler = () => {
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
    <InfoBoxButton
        width={BUTTON_WIDTH}
        curButtonCategory={BUTTON_CATEGORIES.EMPIRE}
        curButtonType={EMPIRE_BUTTON_TYPES.BUILD_HOUSE}
        handler={buildHouseHandler}
    />
    {#if $resources[RESOURCE_TYPES.WOOD].display}
        <InfoBoxButton
            width={BUTTON_WIDTH}
            curButtonType={EMPIRE_BUTTON_TYPES.GATHER_WOOD}
            handler={{}}
        />
    {/if}
    {#if $resources[RESOURCE_TYPES.FARMS].display}
        <InfoBoxButton
            width={BUTTON_WIDTH}
            curButtonType={EMPIRE_BUTTON_TYPES.CREATE_FARM}
            handler={{}}
        />
    {/if}
    {#if $resources[RESOURCE_TYPES.FARMS].value > 1}
        <InfoBoxButton
            width={BUTTON_WIDTH}
            curButtonType={EMPIRE_BUTTON_TYPES.CREATE_TREE_FARM}
            handler={createTreeFarmHandler}
        />
    {/if}
    {#if $resources[RESOURCE_TYPES.FARMS].value > 2}
        <InfoBoxButton
            width={BUTTON_WIDTH}
            curButtonType={EMPIRE_BUTTON_TYPES.BUILD_STORAGE}
            handler={buildStorageHandler}
        />
    {/if}
</div>
