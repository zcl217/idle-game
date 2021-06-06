<script lang="ts">
    import InfoBoxButton from "../InfoBoxButton.svelte";
    import CharacterFrame from "../CharacterFrame.svelte";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import {
        BUTTON_CATEGORIES,
        BUTTON_WIDTH,
    } from "~/constants/buttons/buttons";
    import { DIALOGUES } from "~/constants/story";
    import { displayDialogueBox, updateDialogue } from "~/store/dialogue";
    import { resources } from "~/store/resources";
    import {
        playerImage,
        playerName,
        obtainedResources,
researchedSciences,
    } from "~/store/gameState";
    import {
        EMPIRE_BUTTON_TYPES,
        EMPIRE_COST_MULTIPLIERS,
    } from "~/constants/buttons/empireButtons";
    import { empireButtonCosts } from "~/store/buttonCosts";
    import { buttonPrereqsMet } from "~/utils/helpers";
import { workers } from "~/store/workers";
import { WORKER_TYPES } from "~/constants/workers/workerTypes";

    let buttonsToDisplay: Set<string> = new Set();
    let hiddenButtons: Set<string> = new Set();
    hiddenButtons.add(EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE);

    $: {
        $obtainedResources;
        $researchedSciences;
        let oldLength = buttonsToDisplay.size;
        for (let [key, id] of Object.entries(EMPIRE_BUTTON_TYPES)) {
            if (hiddenButtons.has(id)) continue;
            if (buttonPrereqsMet(id, BUTTON_CATEGORIES.EMPIRE)) {
                buttonsToDisplay.add(id);
            }
        }
        // trigger reactivity
        if (buttonsToDisplay.size !== oldLength)
            buttonsToDisplay = buttonsToDisplay;
    }

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
            case EMPIRE_BUTTON_TYPES.BUILD_HOUSE:
                buildHouseHandler(buttonType);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_LIBRARY:
                buildLibraryHandler(buttonType);
                break;
            default:
                break;
        }
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
        workers.increment(WORKER_TYPES.UNASSIGNED);
    };

    const buildLibraryHandler = (buttonType: string) => {
        const library = RESOURCE_TYPES.LIBRARIES;
        if (!hasEnoughResources(buttonType)) return;
        spendResources(buttonType);
        resources.updateResourceValue(library, $resources[library].value + 1);
        empireButtonCosts.updateButtonCosts(
            buttonType,
            EMPIRE_COST_MULTIPLIERS[buttonType]
        );
        obtainedResources.add(RESOURCE_TYPES.LIBRARIES);
    };

    const hasEnoughResources = (buttonType: string) => {
        console.log(buttonType);
        console.log($empireButtonCosts);
        for (let resource of $empireButtonCosts[buttonType]) {
            const curResourceAmount = $resources[resource.type].value;
            console.log(curResourceAmount + " " + resource.cost);
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
<div class="container flex flex-wrap">
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
        <div/>
    {/if}
</div>

<style>
    .container > * {
        flex: 50%;
    }
</style>
