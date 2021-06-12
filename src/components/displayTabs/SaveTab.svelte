<script lang="ts">
    import { isEmpty, size } from "lodash";
    import { get } from "svelte/store";
    import GameLoop from "~/GameLoop.svelte";
    import * as ButtonCostsStore from "~/store/buttonCosts";
    import * as GameStateStore from "~/store/gameState";
    import * as MilitaryStore from "~/store/military";
    import * as ResourcesStore from "~/store/resources";
    //  import * as ScienceStore from "~/store/science";
    import * as WorkersStore from "~/store/workers";

    // TODO: refactor this file
    const dividerCount =
        size(ButtonCostsStore) +
        size(GameStateStore) +
        size(MilitaryStore) +
        size(ResourcesStore) +
        size(WorkersStore);
    const divider = "divider";
    const hashSetStores = new Set<string>([
        "researchedSciences",
        "obtainedResources",
    ]);
    let loadError = false;
    let loadSuccess = false;
    let saveText = "";
    let loadText = "";
    let copiedSave = false;
    const generateSave = () => {
        saveText += generateStoreSave(ButtonCostsStore);
        saveText += generateStoreSave(GameStateStore);
        saveText += generateStoreSave(MilitaryStore);
        saveText += generateStoreSave(ResourcesStore);
        saveText += generateStoreSave(WorkersStore);
        // remove the last divider
        saveText = saveText.substring(0, saveText.length - divider.length);
        saveText = btoa(saveText);
        copiedSave = false;
    };
    const generateStoreSave = (stores: any): string => {
        let save = "";
        for (const [key, value] of Object.entries(stores)) {
            save += stringifyStore(key, value);
        }
        return save;
    };
    const stringifyStore = (key: string, value: any): string => {
        let storeValue = get(value);
        // can't json stringify a set directly so we need to parse it into an array
        if (hashSetStores.has(key)) {
            storeValue = isEmpty(storeValue)
                ? []
                : [...(storeValue as Set<string>)];
        }
        return JSON.stringify(storeValue) + divider;
    };
    const copySave = () => {
        let text = document.getElementById("generatedSave") as HTMLInputElement;
        text.select();
        text.setSelectionRange(0, text.value.length);
        document.execCommand("copy");
        copiedSave = true;
    };
    const loadSave = () => {
        if (loadText === "showmethemoney") {
            const resources = get(ResourcesStore.resources);
            for (let [name, resource] of Object.entries(resources)) {
                if (resource.limit < Number.MAX_VALUE - 5000) {
                    ResourcesStore.resources.setResourceLimit(
                        name,
                        100000000
                    );
                    ResourcesStore.resources.setResourceValue(
                        name,
                        resources[name].limit
                    );
                }
            }
            return;
        }
        let stringValues = [];
        try {
            stringValues = atob(loadText).split("divider");
        } catch {
            loadError = true;
            return;
        }
        if (stringValues.length !== dividerCount) {
            loadError = true;
            return;
        }
        let storeValues = [];
        for (let val of stringValues) {
            val === ""
                ? storeValues.push("")
                : storeValues.push(JSON.parse(val));
        }
        try {
            setStoreValues(ButtonCostsStore, storeValues);
            setGameStateStore(storeValues);
            setStoreValues(MilitaryStore, storeValues);
            setStoreValues(ResourcesStore, storeValues);
            setStoreValues(WorkersStore, storeValues);
        } catch (error) {
            console.log(error);
            loadError = true;
            return;
        }
        loadSuccess = true;
    };
    const setStoreValues = (stores: any, storeValues: any[]) => {
        for (const store of Object.values(stores)) {
            // @ts-ignore
            store.set(storeValues.shift());
        }
    };
    // modules are sorted in alphabetical order when building,
    // so if you manually load modules, you have to
    // load in alphabetical order too
    const setGameStateStore = (storeValues: any[]) => {
        GameStateStore.blastFurnacesActivated.set(storeValues.shift());
        GameStateStore.curStoryProgress.set(storeValues.shift());
        GameStateStore.inExpedition.set(storeValues.shift());
        GameStateStore.insufficientFood.set(storeValues.shift());
        GameStateStore.ironSmeltersActivated.set(storeValues.shift());
        const obtainedResources = new Set<string>(storeValues.shift());
        GameStateStore.obtainedResources.set(obtainedResources);
        GameStateStore.playerImage.set(storeValues.shift());
        GameStateStore.playerName.set(storeValues.shift());
        const researchedSciences = new Set<string>(storeValues.shift());
        GameStateStore.researchedSciences.set(researchedSciences);
        GameStateStore.resourcesFromExpeditions.set(storeValues.shift());
    };
</script>

<div class="w-3/5 w-min-670px h-min-620px rpgui-container">
    <h4>
        Automatic saving hasn't been implemented yet so you have to save
        manually every time.
    </h4>
    <div class="flex flex-col justify-around h-full">
        <div>
            <h2>Export Save</h2>
            <h5>Copy and paste your generated save to a notepad</h5>
            <textarea id="generatedSave" class="" readonly>{saveText}</textarea>
            <button
                class="flex items-center float-left rpgui-button"
                type="button"
                on:click={() => {
                    generateSave();
                }}
            >
                <p>Generate Save</p>
            </button>
            <button
                class="flex items-center rpgui-button"
                type="button"
                on:click={() => {
                    copySave();
                }}
            >
                <p>Copy Save</p>
            </button>
            {#if copiedSave}
                <p>Copied to clipboard!</p>
            {/if}
        </div>
        <div class="mt-5">
            <h2>Import Save</h2>
            <h5>Copy and paste your exported save here</h5>
            <textarea bind:value={loadText} />
            <button
                class="flex items-center rpgui-button"
                type="button"
                on:click={() => {
                    loadSave();
                }}
            >
                <p>Load Save</p>
            </button>
            {#if loadError}
                <p class="">Save file format error. Could not load save.</p>
            {/if}
            {#if loadSuccess}
                <p class="">Save file loaded!</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .w-min-670px {
        min-width: 670px;
    }

    .h-min-620px {
        min-height: 620px;
    }
</style>
