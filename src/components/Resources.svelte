<script>
    import { resources } from "../store/resources.js";
    import { resourceParser, calculateGenerationRate } from "../utils/helpers";
    // figure out how to manage resources (maybe from store?) do we use array for this or something with faster access like map?
</script>

<div class="absolute mt-5 top-1/2">
    {#each Object.entries($resources) as [type, resource]}
        {#if resource.display}
            {#if resource.limit < Number.MAX_VALUE}
                <p>
                    {type}: {resourceParser(resource.value)}/{resourceParser(
                        resource.limit
                    )} 
                    {#if resource.displayGenerationRate}
                        +{calculateGenerationRate(type, $resources)}/s
                    {/if}
                </p>
            {:else}
                <p>{type}: {resource.value}</p>
            {/if}
        {/if}
    {/each}
</div>
