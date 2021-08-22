<script lang="ts">
    import {
        COLLECTION_NAME,
        COLLECTION_REWARDS_TEXT,
        COLLECTION_VOLUMES,
        LIBRARY_COLLECTIONS,
    } from "~/constants/library/library";
import { unlockedCollections } from "~/store/library";

    let selectedCollection = "";
    let selectedVolume = -1;
    let isViewingCollection = false;

    const handleCollectionSelection = (collection: string) => {
        selectedCollection = collection;
        selectedVolume = -1;
    };
</script>


    {#if isViewingCollection}
        <div class="flex flex-row justify-between">
            <button class="rpgui-button" on:click={() => isViewingCollection = false}> Back </button>
        <div>
            {#each COLLECTION_VOLUMES[selectedCollection] as vol, index}
                <button
                    class="mx-3 rpgui-button"
                    disabled={$unlockedCollections.has(selectedCollection + index)}
                    on:click={() => (selectedVolume = index)}
                    >Vol {index + 1}</button
                >
            {/each}
        </div>
    </div>
        {#if selectedVolume >= 0}
            <div class="text-sm whitespace-pre">
                {@html COLLECTION_VOLUMES[selectedCollection][selectedVolume]}
            </div>
        {/if}
    {:else}
    <div class="flex flex-row justify-between">
        <div class="w-1/3">
            <h2 class="text-left">Collections</h2>
            <div class="flex flex-col h-1/2 rpgui-container framed-golden">
                {#each Object.entries(LIBRARY_COLLECTIONS) as [key, collection]}
                    <button
                        class="rpgui-button"
                        on:click={() => handleCollectionSelection(collection)}
                    >
                        {COLLECTION_NAME[collection]}
                    </button>
                {/each}
                <button class="rpgui-button disabled" disabled={true}>
                    ?
                </button>
            </div>
        </div>

        {#if selectedCollection !== ""}
            <div class="flex flex-col items-center mt-10">
                <h2>{COLLECTION_NAME[selectedCollection]}</h2>

                <p class="my-4">Reward for collection completion:</p>
                <div class="mb-4 whitespace-pre">
                    <p> {COLLECTION_REWARDS_TEXT[selectedCollection]} </p>
                </div>

                <button
                    class="mt-10 w-300px rpgui-button"
                    on:click={() => (isViewingCollection = true)}
                >
                    Open collection
                </button>
            </div>
        {/if}
        
</div>
    {/if}

<style>
    .whitespace-pre {
        white-space: pre-line;
    }
    .w-300px {
        width: 300px;
    }
</style>
