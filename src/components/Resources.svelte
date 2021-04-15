<script>
    import { resources } from "../store/resources.js";
    import { workers } from "../store/workers.js";
    import { resourceTypes, resourceDisplayPrereqs } from "../constants/resourceTypes";
    import {
        resourceParser,
        calculateGenerationRate,
    } from "../utils/helpers";
    import {
        obtainedResources,
        researchedSciences,
    } from "~/store/gameState.js";
    // figure out how to manage resources (maybe from store?) do we use array for this or something with faster access like map?
    const displayGenerationRate = (type) => {
        return type !== resourceTypes.STORAGE;
    };

    const resourcePrereqsMet = (type) => {
        if (!resourceDisplayPrereqs[type]) return false;
        const { sciencePrereqs } = resourceDisplayPrereqs[type];
        const { resourcePrereqs } = resourceDisplayPrereqs[type];
        for (let science of sciencePrereqs) {
            if (!$researchedSciences.has(science)) return false;
        }
        for (let resource of resourcePrereqs) {
            if (!$obtainedResources.has(resource)) return false;
        }
        return true;
    }
</script>

<div class="mt-5">
    {#each Object.entries($resources) as [type, resource]}
        {#if resourcePrereqsMet(type)}
            {#if resource.limit < Number.MAX_VALUE}
                <p>
                    {type}: {resourceParser(resource.value)}/{resourceParser(
                        resource.limit
                    )}
                    {#if displayGenerationRate(type)}
                        +{calculateGenerationRate(type, $resources, $workers)}/s
                    {/if}
                </p>
            {:else}
                <p>{type}: {resource.value}</p>
            {/if}
        {/if}
    {/each}
</div>
