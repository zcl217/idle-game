<script lang="ts">
    import { get } from "svelte/store";
    import {
        INDUSTRY_BUILDINGS,
        INDUSTRY_BUILDING_STORE_MAP,
        INDUSTRY_BUILDING_TITLES,
    } from "~/constants/resources/industry";
    import { obtainedResources } from "~/store/resources";
    import IndustryBuilding from "../IndustryBuilding.svelte";

    const toggleBuilding = (industryBuilding: string, state: boolean) => {
        const store = INDUSTRY_BUILDING_STORE_MAP[industryBuilding];
        store.set(state);
    };
    $: unlockedIndustries = INDUSTRY_BUILDINGS.filter((industry) =>
        $obtainedResources.has(industry)
    ).length;
</script>

<div class="flex flex-row flex-wrap justify-around m-4">
    {#each INDUSTRY_BUILDINGS as industryBuilding}
        {#if $obtainedResources.has(industryBuilding)}
            <IndustryBuilding
                {industryBuilding}
                handler={toggleBuilding}
                activated={get(INDUSTRY_BUILDING_STORE_MAP[industryBuilding])}
            />
        {/if}
    {/each}
</div>

<style>
    .m-4 {
        margin: 16px;
    }
</style>