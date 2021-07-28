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

    let displayCredits = false;
    // TODO: refactor this file
    // KEY POINT: Don't forget to add every hashset store into the hashSetStores constant!
    const dividerCount =
        size(ButtonCostsStore) +
        size(GameStateStore) +
        size(MilitaryStore) +
        size(ResourcesStore) +
        size(WorkersStore);
    const divider = "divider";
    const hashSetStores = new Set<string>([
        "hiddenButtons",
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
                    ResourcesStore.resources.setResourceLimit(name, 100000000);
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
            setResourcesStore(storeValues);
            setStoreValues(WorkersStore, storeValues);
        } catch (error) {
            console.log(error);
            loadError = true;
            loadSuccess = false;
            return;
        }
        loadError = false;
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
        GameStateStore.curStoryProgress.set(storeValues.shift());
        const hiddenButtons = new Set<string>(storeValues.shift());
        GameStateStore.hiddenButtons.set(hiddenButtons);
        GameStateStore.inExpedition.set(storeValues.shift());
        GameStateStore.playerImage.set(storeValues.shift());
        GameStateStore.playerName.set(storeValues.shift());
        const researchedSciences = new Set<string>(storeValues.shift());
        GameStateStore.researchedSciences.set(researchedSciences);
    };
    const setResourcesStore = (storeValues: any[]) => {
        ResourcesStore.blastFurnacesActivated.set(storeValues.shift());
        ResourcesStore.insufficientFood.set(storeValues.shift());
        ResourcesStore.ironSmeltersActivated.set(storeValues.shift());
        const obtainedResources = new Set<string>(storeValues.shift());
        ResourcesStore.obtainedResources.set(obtainedResources);
        ResourcesStore.resources.set(storeValues.shift());
        ResourcesStore.resourcesFromExpeditions.set(storeValues.shift());
        ResourcesStore.workshopsActivated.set(storeValues.shift());
    };
</script>

{#if displayCredits}
    <div
        class="absolute flex flex-col w-95 h-95 z-100 rpgui-container framed-golden"
    >
        <p class="flex justify-center mt-4 mb-10">Credits</p>
        <p>Sprites: Battle for Wesnoth</p>
        <br />
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/wesnoth/wesnoth"> https://github.com/wesnoth/wesnoth </a>
        <br />
        <p>Icons: Shikashi's Fantasy Icons Pack</p>
        <br />
        <a target="_blank" rel="noopener noreferrer" href="https://cheekyinkling.itch.io/shikashis-fantasy-icons-pack">
            https://cheekyinkling.itch.io/shikashis-fantasy-icons-pack
        </a>

        <div class="bottom-0 flex justify-center mt-10">
            <button
                class="flex items-center rpgui-button b-4"
                type="button"
                on:click={() => (displayCredits = false)}
            >
                <p>Close</p>
            </button>
        </div>
    </div>
{/if}
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
            <div class="flex justify-between">
                <button
                    class="flex items-center rpgui-button"
                    type="button"
                    on:click={() => {
                        loadSave();
                    }}
                >
                    <p>Load Save</p>
                </button>
                <button
                    class="flex items-center rpgui-button"
                    type="button"
                    on:click={() => (displayCredits = true)}
                >
                    <p>Credits</p>
                </button>
            </div>
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

    .z-100 {
        z-index: 100;
    }

    .h-95 {
        height: 95%;
    }
    .w-95 {
        width: 95%;
    }
    .mt-10 {
        margin-top: 40px;
    }
</style>
