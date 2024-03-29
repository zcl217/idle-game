<script lang="ts">
    import InfoBoxButton from "~/components/infoBoxes/InfoBoxButton.svelte";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import {
        BUTTON_CATEGORIES,
        BUTTON_WIDTH,
    } from "~/constants/buttons/buttons";
    import { obtainedResources, resources } from "~/store/resources";
    import { researchedSciences, hiddenButtons } from "~/store/gameState";
    import {
        BUTTON_RESOURCE_MAPPING,
        EMPIRE_BUTTON_TYPES,
        INDUSTRY_SECTOR_BUTTONS,
        RESIDENTIAL_SECTOR_BUTTONS,
        STORAGE_SECTOR_BUTTONS,
    } from "~/constants/buttons/empireButtons";
    import { empireButtonCosts } from "~/store/buttonCosts";
    import { buttonPrereqsMet } from "~/utils/helpers";
    import { totalWorkers, workers } from "~/store/workers";
    import { WORKER_TYPES } from "~/constants/workers/workerTypes";
    import {
        BONUSES, CAPACITIES
    } from "~/constants/gameState";
    import {
        hasEnoughResources,
        spendResources,
    } from "~/utils/resourceHelpers";

    let buttonsToDisplay: Set<string> = new Set();
    let residentialSectorButtons: Set<string> = new Set();
    let storageSectorButtons: Set<string> = new Set();
    let industrySectorButtons: Set<string> = new Set();
    $: {
        //have to use multiple lists
        $obtainedResources;
        $researchedSciences;
        let oldResidentialSectorLength = residentialSectorButtons.size;
        let oldStorageSectorLength = storageSectorButtons.size;
        let oldIndustrySectorLength = industrySectorButtons.size;
        residentialSectorButtons.clear();
        storageSectorButtons.clear();
        industrySectorButtons.clear();
        for (let [key, id] of Object.entries(EMPIRE_BUTTON_TYPES)) {
            if ($hiddenButtons.has(id)) continue;
            if (buttonPrereqsMet(id, BUTTON_CATEGORIES.EMPIRE)) {
                if (RESIDENTIAL_SECTOR_BUTTONS.has(id))
                    residentialSectorButtons.add(id);
                if (STORAGE_SECTOR_BUTTONS.has(id))
                    storageSectorButtons.add(id);
                if (INDUSTRY_SECTOR_BUTTONS.has(id))
                    industrySectorButtons.add(id);
            }
        }
        triggerButtonReactivity(
            oldResidentialSectorLength,
            oldStorageSectorLength,
            oldIndustrySectorLength
        );
    }

    const triggerButtonReactivity = (
        oldResidentialSectorLength: number,
        oldStorageSectorLength: number,
        oldIndustrySectorLength: number
    ) => {
        if (oldResidentialSectorLength !== residentialSectorButtons.size) {
            residentialSectorButtons = residentialSectorButtons;
        }
        if (oldStorageSectorLength !== storageSectorButtons.size) {
            storageSectorButtons = storageSectorButtons;
        }
        if (oldIndustrySectorLength !== industrySectorButtons.size) {
            industrySectorButtons = industrySectorButtons;
        }
    };

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
            case EMPIRE_BUTTON_TYPES.BUILD_ATHENAEUM:
                $hiddenButtons.add(EMPIRE_BUTTON_TYPES.BUILD_ATHENAEUM);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_HOUSE:
                workers.increment(WORKER_TYPES.UNASSIGNED, BONUSES.HOUSE);
                totalWorkers.add(BONUSES.HOUSE);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_MANSION:
                workers.increment(WORKER_TYPES.UNASSIGNED, BONUSES.MANSION);
                totalWorkers.add(BONUSES.MANSION);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_STORAGE:
                incrementResourceLimits(CAPACITIES.STORAGE);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_WAREHOUSE:
                incrementResourceLimits(CAPACITIES.WAREHOUSE);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_HUGE_WAREHOUSE:
                incrementResourceLimits(CAPACITIES.HUGE_WAREHOUSE);
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_GRANARY:
                resources.incrementResourceLimit(
                    RESOURCE_TYPES.FOOD,
                    CAPACITIES.GRANARY
                );
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_SAWMILL:
                resources.incrementResourceLimit(
                    RESOURCE_TYPES.WOOD,
                    CAPACITIES.SAWMILL
                );
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_QUARRY:
                resources.incrementResourceLimit(
                    RESOURCE_TYPES.RAW_ORE,
                    CAPACITIES.QUARRY
                );
                resources.incrementResourceLimit(
                    RESOURCE_TYPES.COAL,
                    CAPACITIES.QUARRY
                );
                resources.incrementResourceLimit(
                    RESOURCE_TYPES.GOLD,
                    CAPACITIES.QUARRY
                );
                break;
            case EMPIRE_BUTTON_TYPES.BUILD_UNIVERSITY:
                resources.incrementResourceLimit(
                    RESOURCE_TYPES.KNOWLEDGE,
                    CAPACITIES.UNIVERSITY
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
            $resources[resourceType].value
        );
        obtainedResources.add(resourceType);
        return true;
    };
    const incrementResourceLimits = (payload: number) => {
        for (let [name, resource] of Object.entries($resources)) {
            if (resource.limit < Number.MAX_VALUE - 5000) {
                resources.incrementResourceLimit(name, payload);
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
    <!-- Residential sector buttons -->
    {#if residentialSectorButtons.size > 0}
        <h1 class="flex-1 text-left">Residential Sector</h1>
    {/if}
    {#each [...residentialSectorButtons] as id}
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
    <!-- Button spacing -->
    {#if residentialSectorButtons.size % 3 === 1}
        <div />
        <div />
    {:else if residentialSectorButtons.size % 3 === 2}
        <div />
    {/if}
    <!-- Storage sector buttons -->
    {#if storageSectorButtons.size > 0}
        <h1 class="flex-1 pt-3 text-left">Storage Sector</h1>
    {/if}
    {#each [...storageSectorButtons] as id}
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
    <!-- Button spacing -->
    {#if storageSectorButtons.size % 3 === 1}
        <div />
        <div />
    {:else if storageSectorButtons.size % 3 === 2}
        <div />
    {/if}
    <!-- Industry sector buttons -->
    {#if industrySectorButtons.size > 0}
        <h1 class="flex-1 pt-3 text-left">Industry Sector</h1>
    {/if}
    {#each [...industrySectorButtons] as id}
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
    <!-- Button spacing -->
    {#if industrySectorButtons.size % 3 === 1}
        <div />
        <div />
    {:else if industrySectorButtons.size % 3 === 2}
        <div />
    {/if}
</div>

<style>
    .container > * {
        flex: 33%;
    }
    .flex-1 {
        flex: 100% !important;
    }
    .pt-3 {
        padding-top: 12px;
    }
</style>
