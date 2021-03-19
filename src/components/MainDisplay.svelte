<script lang="ts">
    import InfoBoxButton from "./InfoBoxButton.svelte";
    import CharacterFrame from "./CharacterFrame.svelte";
    import {
        resourceTypes,
        resourceCostMultipliers,
    } from "../constants/resourceTypes.js";
    import { buttonTypes } from "../constants/buttons.js";
    import { resources, resourceCosts } from "../store/resources.js";
    import { playerImage, playerName } from "../store/gameState.js";

    const gatherFoodHandler = () => {
        const food = resourceTypes.FOOD;
        resources.updateResourceValue(food, $resources[food].value + 10);
    };

    const createFarmHandler = () => {
        const farms = resourceTypes.FARMS;
        if (!spendResources(farms)) return;
        resources.updateResourceValue(farms, $resources[farms].value + 1);
        resourceCosts.updateResourceCosts(
            farms,
            resourceCostMultipliers[farms]
        );
    };

    const gatherWoodHandler = () => {
        const wood = resourceTypes.WOOD;
        resources.updateResourceValue(wood, $resources[wood].value + 100);
    };

    const buildStorageHandler = () => {
        const storage = resourceTypes.STORAGE;
        if (!spendResources(storage)) return;
        resources.updateResourceValue(storage, $resources[storage].value + 1);
        const food = resourceTypes.FOOD;
        resources.updateResourceLimit(food, $resources[food].limit + 100);
        const wood = resourceTypes.WOOD;
        resources.updateResourceLimit(wood, $resources[wood].limit + 100);
        resourceCosts.updateResourceCosts(
            storage,
            resourceCostMultipliers[storage]
        );
    }

    // returns true if there were enough resources to spend
    const spendResources = (type) => {
        for (let resource of $resourceCosts[type]) {
            const curResourceAmount = $resources[resource.type].value;
            if (curResourceAmount < resource.cost) return false;
        }
        for (let resource of $resourceCosts[type]) {
            const curResourceAmount = $resources[resource.type].value;
            resources.updateResourceValue(
                resource.type,
                curResourceAmount - resource.cost
            );
        }
        return true;
    }
</script>

<div class="w-8/12 w-min-550px h-5/6 rpgui-container framed-golden-2">
    <CharacterFrame characterImage={$playerImage} characterName={$playerName} />
    <div class="flex flex-wrap">
        <InfoBoxButton
            curButtonType={buttonTypes.GATHER_FOOD}
            handler={gatherFoodHandler}
        />
        {#if $resources.farms.display}
            <InfoBoxButton
                curButtonType={buttonTypes.CREATE_FARM}
                handler={createFarmHandler}
            />
        {/if}
        {#if $resources.wood.display}
            <InfoBoxButton
                curButtonType={buttonTypes.GATHER_WOOD}
                handler={gatherWoodHandler}
            />
        {/if}
        {#if $resources.wood.display}
            <InfoBoxButton
                curButtonType={buttonTypes.BUILD_STORAGE}
                handler={buildStorageHandler}
            />
        {/if}
    </div>
</div>

<style>
    .w-min-550px {
        min-width: 550px;
    }
</style>
