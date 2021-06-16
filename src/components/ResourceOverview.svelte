<script lang="ts">
    import { resources } from "../store/resources";
    import { SPECIAL_RESOURCES } from "../constants/resources/resourceTypes";
    import { RESOURCE_DISPLAY_PREREQS } from "~/constants/resources/resourcePrereqs";
    import { obtainedResources } from "~/store/resources";
    import { researchedSciences } from "~/store/gameState";
    import ResourceTableRow from "./ResourceTableRow.svelte";
    const resourcePrereqsMet = (type: string) => {
        if (SPECIAL_RESOURCES.has(type) && $resources[type].value > 0) {
            return true;
        }
        if (!RESOURCE_DISPLAY_PREREQS[type]) return false;
        const { sciencePrereqs } = RESOURCE_DISPLAY_PREREQS[type];
        const { resourcePrereqs } = RESOURCE_DISPLAY_PREREQS[type];
        for (let science of sciencePrereqs) {
            if (!$researchedSciences.has(science)) return false;
        }
        for (let resource of resourcePrereqs) {
            if (!$obtainedResources.has(resource)) return false;
        }
        return true;
    };
</script>

<div class="mt-5">
    <table>
        {#each Object.entries($resources) as [type, resource]}
            {#if resourcePrereqsMet(type) && !SPECIAL_RESOURCES.has(type)}
                <ResourceTableRow {resource} {type} />
            {/if}
        {/each}
    </table>
</div>

<style>
    table {
        margin-left: 0;
        border-collapse: separate;
        border-spacing: 40px 3px;
        color: white;
        margin-left: -55px;
    }
</style>
