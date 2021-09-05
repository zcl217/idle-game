<script lang="ts">
    import { resources } from "../store/resources";
    import {
        BUILDINGS,
        SPECIAL_RESOURCES,
    } from "../constants/resources/resourceTypes";
    import { RESOURCE_DISPLAY_PREREQS } from "~/constants/resources/resourcePrereqs";
    import { obtainedResources } from "~/store/resources";
    import { researchedSciences } from "~/store/gameState";
    import ResourceTableRow from "./ResourceTableRow.svelte";

    let displayBuildings = false;
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

    const shouldDisplayResource = (type: string) => {
        return resourcePrereqsMet(type) && !SPECIAL_RESOURCES.has(type);
    };
</script>

<div class="ml-3">
    <div class="flex flex-row items-start mb-3 -ml-3 button-font">
        <button
            class="flex rpgui-button tab-width {displayBuildings
                ? ''
                : 'selected'} "
            type="button"
            on:click={() => (displayBuildings = false)}
        >
            <span class="w-8 h-8 m-auto bg-chest" />
        </button>

        <button
            class="flex ml-3 rpgui-button tab-width {displayBuildings
                ? 'selected'
                : ''}"
            type="button"
            on:click={() => (displayBuildings = true)}
        >
            <span class="w-8 h-8 m-auto bg-buildings" />
        </button>
    </div>
    <hr class="-mt-2" />
    <table class="{displayBuildings ? '' : 'w-full'}">
        {#if displayBuildings}
            {#each Object.entries($resources) as [type, resource]}
                {#if shouldDisplayResource(type) && BUILDINGS.has(type)}
                    <ResourceTableRow {resource} {type} />
                {/if}
            {/each}
        {:else}
            {#each Object.entries($resources) as [type, resource]}
                {#if shouldDisplayResource(type) && !BUILDINGS.has(type)}
                    <ResourceTableRow {resource} {type} />
                {/if}
            {/each}
        {/if}
    </table>
</div>

<style>
    table {
        margin-left: -55px;
        border-collapse: separate;
        border-spacing: 40px 3px;
        color: white;
    }
    .tab-width {
        width: 105px;
        min-width: 0px !important;
    }
    .button-font {
        font-size: 10px;
    }
    .-ml-3 {
        margin-left: -12px;
    }
    .-mt-2 {
        margin-top: -8px;
    }
</style>
