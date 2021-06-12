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
        BUTTON_RESOURCE_MAPPING,
        EMPIRE_BUTTON_TYPES,
        EMPIRE_COST_MULTIPLIERS,
        INITIAL_EMPIRE_BUTTON_COSTS,
    } from "~/constants/buttons/empireButtons";
    import { empireButtonCosts } from "~/store/buttonCosts";
    import { buttonPrereqsMet } from "~/utils/helpers";
    import { workers } from "~/store/workers";
    import { WORKER_TYPES } from "~/constants/workers/workerTypes";
    import {
        GRANARY_CAPACITY,
        STORAGE_CAPACITY,
        WAREHOUSE_CAPACITY,
    } from "~/constants/gameState";
    import {
        hasEnoughResources,
        spendResources,
    } from "~/utils/resourceHelpers";

    let buttonsToDisplay: Set<string> = new Set();
    let hiddenButtons: Set<string> = new Set([
        EMPIRE_BUTTON_TYPES.GATHER_FOOD,
        EMPIRE_BUTTON_TYPES.GATHER_WOOD,
        EMPIRE_BUTTON_TYPES.BUILD_ATTRACTIVE_HOUSE,
    ]);
    $: {
        //have to use multiple lists
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
            case EMPIRE_BUTTON_TYPES.BUILD_HOUSE:
                workers.increment(WORKER_TYPES.UNASSIGNED, 1);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_STORAGE:
                incrementResourceLimits(STORAGE_CAPACITY);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE:
                incrementResourceLimits(WAREHOUSE_CAPACITY);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_GRANARY:
                resources.setResourceLimit(
                    RESOURCE_TYPES.FOOD,
                    $resources[RESOURCE_TYPES.FOOD].limit + GRANARY_CAPACITY
                );
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_SAWMILL:
                resources.setResourceLimit(
                    RESOURCE_TYPES.WOOD,
                    $resources[RESOURCE_TYPES.WOOD].limit + GRANARY_CAPACITY
                );
                break;
            default:
                break;
        }
    };
    const gatherResource = (type: string) => {
        resources.incrementResourceValue(type, 10);
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
            EMPIRE_COST_MULTIPLIERS[buttonType]
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
        <div />
    {/if}
</div>

<style>
    .container > * {
        flex: 50%;
    }
</style>
