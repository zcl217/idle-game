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
    let loadText = "eyJjcmVhdGVGYXJtIjpbeyJ0eXBlIjoiZm9vZCIsImNvc3QiOjUzfSx7InR5cGUiOiJ3b29kIiwiY29zdCI6NDF9XSwiYnVpbGRTdG9yYWdlIjpbeyJ0eXBlIjoid29vZCIsImNvc3QiOjIwMDB9XSwiY3JlYXRlVHJlZUZhcm0iOlt7InR5cGUiOiJ3b29kIiwiY29zdCI6NjV9XSwiYnVpbGRBdHRyYWN0aXZlSG91c2UiOlt7InR5cGUiOiJmb29kIiwiY29zdCI6NzAwfSx7InR5cGUiOiJ3b29kIiwiY29zdCI6NzAwfV0sImJ1aWxkSG91c2UiOlt7InR5cGUiOiJ3b29kIiwiY29zdCI6MTIwfV0sImJ1aWxkTGlicmFyeSI6W3sidHlwZSI6Indvb2QiLCJjb3N0Ijo5MDB9XSwiYnVpbGRXYXJlaG91c2UiOlt7InR5cGUiOiJ3b29kUGxhbmsiLCJjb3N0Ijo1NTd9LHsidHlwZSI6Imlyb24iLCJjb3N0Ijo0Mzd9XSwiYnVpbGRHcmFuYXJ5IjpbeyJ0eXBlIjoiZm9vZCIsImNvc3QiOjUwMH0seyJ0eXBlIjoid29vZFBsYW5rIiwiY29zdCI6MjB9LHsidHlwZSI6Imlyb24iLCJjb3N0IjoxMH1dLCJidWlsZFNhd21pbGwiOlt7InR5cGUiOiJ3b29kIiwiY29zdCI6NTAwfSx7InR5cGUiOiJ3b29kUGxhbmsiLCJjb3N0IjoyMH0seyJ0eXBlIjoiaXJvbiIsImNvc3QiOjEwfV0sImJ1aWxkUXVhcnJ5IjpbeyJ0eXBlIjoicmF3T3JlIiwiY29zdCI6NTAwfSx7InR5cGUiOiJ3b29kUGxhbmsiLCJjb3N0IjoyMH0seyJ0eXBlIjoiaXJvbiIsImNvc3QiOjEwfV0sImJ1aWxkVW5pdmVyc2l0eSI6W3sidHlwZSI6Imtub3dsZWRnZSIsImNvc3QiOjUwMH0seyJ0eXBlIjoiZnVycyIsImNvc3QiOjEwMH0seyJ0eXBlIjoid29vZFBsYW5rIiwiY29zdCI6MjB9LHsidHlwZSI6Imlyb24iLCJjb3N0IjoxMH1dLCJidWlsZFdvcmtzaG9wIjpbeyJ0eXBlIjoid29vZCIsImNvc3QiOjMwMDB9LHsidHlwZSI6ImdvbGQiLCJjb3N0IjoxfV0sImJ1aWxkSXJvblNtZWx0ZXIiOlt7InR5cGUiOiJyYXdPcmUiLCJjb3N0Ijo1MDAwfSx7InR5cGUiOiJjb2FsIiwiY29zdCI6NTAwfSx7InR5cGUiOiJ3b29kUGxhbmsiLCJjb3N0IjoxMDB9LHsidHlwZSI6ImdvbGQiLCJjb3N0Ijo1fV0sImJ1aWxkQmxhc3RGdXJuYWNlIjpbeyJ0eXBlIjoicmF3T3JlIiwiY29zdCI6MTAwMDB9LHsidHlwZSI6Indvb2QiLCJjb3N0Ijo1MDAwfSx7InR5cGUiOiJjb2FsIiwiY29zdCI6MTAwMH0seyJ0eXBlIjoid29vZFBsYW5rIiwiY29zdCI6MjAwfSx7InR5cGUiOiJpcm9uIiwiY29zdCI6MTAwfSx7InR5cGUiOiJnb2xkIiwiY29zdCI6MjB9XX1kaXZpZGVyMTZkaXZpZGVyWyJnYXRoZXJGb29kIiwiZ2F0aGVyV29vZCIsImJ1aWxkQXR0cmFjdGl2ZUhvdXNlIiwiYnVpbGRMaWJyYXJ5Il1kaXZpZGVyZmFsc2VkaXZpZGVyIi4uL3Nwcml0ZXMvcGVhc2FudC5wbmciZGl2aWRlciJQZWFzYW50ImRpdmlkZXJbImEiLCJiIiwiYyIsImQiLCJvcmVNaW5pbmciLCJ3b29kZW5QaWNrYXhlIiwiZG91YmxlQml0QXhlIiwibWF0aGVtYXRpY3MiLCJob3JzZUNvbGxhciIsImNyYW5lIiwiYmxvY2tQcmludGluZyIsImluZHVzdHJ5IiwiaXJvblNtZWx0aW5nIiwiYm93U2F3IiwiaGVhdnlQbG93IiwiaXJvblBpY2theGUiLCJiYXJyYWNrcyIsImxhd3NPZk5hdHVyZSIsImNvbnNjcmlwdGlvbiIsInN0ZWVsTWFraW5nIiwidHdvTWFuU2F3Iiwic2xpbmdzaG90cyIsInN0YW5kaW5nQXJteSIsImFydE9mV2FyIiwiaGVhdnlJbmZhbnRyeSIsIm1hZ2ljIl1kaXZpZGVye31kaXZpZGVyeyIxLTEiOmZhbHNlLCIxLTIiOmZhbHNlLCIxLTMiOmZhbHNlLCIxLTQiOmZhbHNlLCIxLTUiOmZhbHNlLCIyLTEiOmZhbHNlLCIyLTIiOmZhbHNlLCIyLTMiOmZhbHNlLCIzLTEiOmZhbHNlLCIzLTIiOmZhbHNlLCIzLTMiOmZhbHNlfWRpdmlkZXIxZGl2aWRlcnsic3BlYXJtYW4iOnsiY291bnQiOjEsInR5cGUiOiJzcGVhcm1hbiJ9LCJmb290cGFkIjp7ImNvdW50IjowLCJ0eXBlIjoiZm9vdHBhZCJ9LCJoZWF2eUluZmFudHJ5Ijp7ImNvdW50IjowLCJ0eXBlIjoiaGVhdnlJbmZhbnRyeSJ9LCJtYWdlIjp7ImNvdW50IjowLCJ0eXBlIjoibWFnZSJ9fWRpdmlkZXIwZGl2aWRlcmZhbHNlZGl2aWRlcmZhbHNlZGl2aWRlcmZhbHNlZGl2aWRlcnt9ZGl2aWRlcmZhbHNlZGl2aWRlcmZhbHNlZGl2aWRlcmZhbHNlZGl2aWRlclsiZm9vZCIsIndvb2QiLCJmYXJtIiwidHJlZUZhcm0iLCJzdG9yYWdlIiwibGlicmFyeSIsImhvbWUiLCJ3YXJlaG91c2UiXWRpdmlkZXJ7ImZvb2QiOnsidmFsdWUiOjI5NTAwLCJsaW1pdCI6Mjk1MDAsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6dHJ1ZX0sIndvb2QiOnsidmFsdWUiOjI5NTAwLCJsaW1pdCI6Mjk1MDAsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6dHJ1ZX0sImtub3dsZWRnZSI6eyJ2YWx1ZSI6MTgzMDAsImxpbWl0IjoyOTUwMCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjp0cnVlfSwicmF3T3JlIjp7InZhbHVlIjoyOTUwMCwibGltaXQiOjI5NTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJjb2FsIjp7InZhbHVlIjoyOTUwMCwibGltaXQiOjI5NTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJ3b29kUGxhbmsiOnsidmFsdWUiOjI5NTAwLCJsaW1pdCI6Mjk1MDAsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6dHJ1ZX0sImlyb24iOnsidmFsdWUiOjI5NTAwLCJsaW1pdCI6Mjk1MDAsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6dHJ1ZX0sInN0ZWVsIjp7InZhbHVlIjoyOTUwMCwibGltaXQiOjI5NTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJnb2xkIjp7InZhbHVlIjoyOTUwMCwibGltaXQiOjI5NTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJmdXJzIjp7InZhbHVlIjoyOTUwMCwibGltaXQiOjI5NTAwLCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOnRydWV9LCJmYXJtIjp7InZhbHVlIjo1LCJnZW5lcmF0aW9uVmFsdWUiOjEsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sInRyZWVGYXJtIjp7InZhbHVlIjo1LCJnZW5lcmF0aW9uVmFsdWUiOjIsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sInN0b3JhZ2UiOnsidmFsdWUiOjEzLCJsaW1pdCI6MS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6ZmFsc2V9LCJ3YXJlaG91c2UiOnsidmFsdWUiOjE3LCJsaW1pdCI6MS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6ZmFsc2V9LCJhdHRyYWN0aXZlSG91c2UiOnsidmFsdWUiOjAsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sImhvbWUiOnsidmFsdWUiOjIsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sImxpYnJhcnkiOnsidmFsdWUiOjEsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sImdyYW5hcnkiOnsidmFsdWUiOjAsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sInNhd21pbGwiOnsidmFsdWUiOjAsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sInVuZGVmaW5lZCI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwidW5pdmVyc2l0eSI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwid29ya3Nob3AiOnsidmFsdWUiOjAsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sImlyb25TbWVsdGVyIjp7InZhbHVlIjowLCJsaW1pdCI6MS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsImRpc3BsYXlHZW5lcmF0aW9uUmF0ZSI6ZmFsc2V9LCJibGFzdEZ1cm5hY2UiOnsidmFsdWUiOjAsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sInNpbmF0cmFTaGF0dGVyZWRBcm1vciI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwiaGFsYmVyZE9mQWR1biI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwibHV0YXJleldhcmhhbW1lciI6eyJ2YWx1ZSI6MCwibGltaXQiOjEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LCJkaXNwbGF5R2VuZXJhdGlvblJhdGUiOmZhbHNlfSwiYWVkdXNUb21lT2ZLbm93bGVkZ2UiOnsidmFsdWUiOjAsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX0sImdlbU9mRXRoZXJlYWxpdHkiOnsidmFsdWUiOjAsImxpbWl0IjoxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCwiZGlzcGxheUdlbmVyYXRpb25SYXRlIjpmYWxzZX19ZGl2aWRlcnsiZm9vZCI6MCwid29vZCI6MCwia25vd2xlZGdlIjowLCJyYXdPcmUiOjAsImNvYWwiOjAsIndvb2RQbGFuayI6MCwiaXJvbiI6MCwiZ29sZCI6MCwiZnVycyI6MCwic3RlZWwiOjAsImZhcm0iOjAsInRyZWVGYXJtIjowLCJob21lIjowLCJsaWJyYXJ5IjowLCJzdG9yYWdlIjowLCJ3YXJlaG91c2UiOjAsImdyYW5hcnkiOjAsInNhd21pbGwiOjAsInVuaXZlcnNpdHkiOjAsIndvcmtzaG9wIjowLCJpcm9uU21lbHRlciI6MCwiYmxhc3RGdXJuYWNlIjowLCJhdHRyYWN0aXZlSG91c2UiOjAsInNpbmF0cmFTaGF0dGVyZWRBcm1vciI6MCwiaGFsYmVyZE9mQWR1biI6MCwibHV0YXJleldhcmhhbW1lciI6MCwiYWVkdXNUb21lT2ZLbm93bGVkZ2UiOjAsImdlbU9mRXRoZXJlYWxpdHkiOjB9ZGl2aWRlcmZhbHNlZGl2aWRlcnsidW5hc3NpZ25lZCI6eyJ2YWx1ZSI6MiwiZ2VuZXJhdGlvblZhbHVlIjowfSwiZmFybWVycyI6eyJ2YWx1ZSI6MCwiZ2VuZXJhdGlvblZhbHVlIjoxMH0sIndvb2RjdXR0ZXJzIjp7InZhbHVlIjowLCJnZW5lcmF0aW9uVmFsdWUiOjEwfSwic2Nob2xhcnMiOnsidmFsdWUiOjAsImdlbmVyYXRpb25WYWx1ZSI6MTB9LCJtaW5lcnMiOnsidmFsdWUiOjAsImdlbmVyYXRpb25WYWx1ZSI6MTB9fQ==";
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
