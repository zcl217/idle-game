<script lang="ts">
    import { get } from "svelte/store";
    import { INDUSTRY_BUILDINGS } from "~/constants/resources/industry";
    import { RESOURCE_TYPES } from "~/constants/resources/resourceTypes";
    import {
        blastFurnacesActivated,
        ironSmeltersActivated,
    } from "~/store/gameState";
    import IndustryBuilding from "./IndustryBuilding.svelte";

    const getIndustryBuildingStore = (industryBuilding: string) => {
        switch (industryBuilding) {
            case RESOURCE_TYPES.IRON_SMELTER:
                return ironSmeltersActivated;
            case RESOURCE_TYPES.BLAST_FURNACE:
                return blastFurnacesActivated;
            default:
                break;
        }
    };

    const getIndustryBuildingStoreValue = (
        industryBuilding: string
    ): boolean => {
        switch (industryBuilding) {
            case RESOURCE_TYPES.IRON_SMELTER:
                return $ironSmeltersActivated;
            case RESOURCE_TYPES.BLAST_FURNACE:
                return $blastFurnacesActivated;
            default:
                break;
        }
    };

    const toggleBuilding = (industryBuilding: string, state: boolean) => {
        const store = getIndustryBuildingStore(industryBuilding);
        store.set(state);
    };
</script>

<div class="flex flex-row flex-wrap justify-around">
    {#each INDUSTRY_BUILDINGS as industryBuilding}
        <IndustryBuilding
            {industryBuilding}
            handler={toggleBuilding}
            activated={getIndustryBuildingStoreValue(industryBuilding)}
        />
    {/each}
</div>

