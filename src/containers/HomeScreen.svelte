<script>
    import MenuTabs from "./MenuTabs.svelte";
    import Resources from "../components/Resources.svelte";
    import MainDisplay from "../components/displayTabs/MainDisplay.svelte";
    import MainDisplayAct2 from "../components/displayTabs/MainDisplayAct2.svelte";
    import WorkersTab from "../components/displayTabs/WorkersTab.svelte";
    import ScienceTab from "../components/displayTabs/ScienceTab.svelte";
    import BarracksTab from "../components/displayTabs/BarracksTab.svelte";
    import ExpeditionTab from "~/components/displayTabs/ExpeditionTab.svelte";
    import MessageLog from "../components/MessageLog.svelte";
    import DialogueBox from "../components/DialogueBox.svelte";
    import InfoBox from "../components/InfoBox.svelte";
    import { TABS } from "../constants/buttons/buttons";
    import CharacterChoice from "~/components/displayTabs/CharacterChoice.svelte";
    import { curStoryProgress, inExpedition } from "~/store/gameState.js";
    import UnitDeploymentTab from "~/components/UnitDeploymentTab.svelte";
    import { STORY_PROGRESS_LIST } from "~/constants/story";
    let darkBackground = true,
        displayMenuTabs = true,
        currentTab = TABS.MAIN_1;
    const toggleTab = (payload) => {
        currentTab = payload.detail;
    };
    $: {
        if ($curStoryProgress === STORY_PROGRESS_LIST["A1S5"]) {
            currentTab = TABS.CHARACTER_CHOICE;
        }
        if ($curStoryProgress === STORY_PROGRESS_LIST["A2S1"]) {
            currentTab = TABS.MAIN_2;
            displayMenuTabs = true;
        }
    }
</script>

<div
    class="overflow-auto rpgui-content w-min-1070px"
    class:bg-gray-300={darkBackground === false}
    class:bg-gray-800={darkBackground === true}
>
    <div
        class="absolute top-5 right-5 rpgui-cursor-point"
        class:text-white={darkBackground === true}
        on:click={() => (darkBackground = !darkBackground)}
    >
        toggle lights
    </div>
    <div class="flex">
        <div class="w-3/12 h-full m-5 mr-0">
            {#if $inExpedition}
                <UnitDeploymentTab />
            {:else}
                <Resources />
            {/if}
        </div>
        <div class="ml-5">
            {#if displayMenuTabs && !$inExpedition}
                <MenuTabs on:toggleTab={toggleTab} />
            {:else}
                <div class="mt-68px" />
            {/if}
            <div
                class="w-8/12 w-min-730px h-min-550px h-5/6 rpgui-container framed-golden-2"
            >
                {#if currentTab === TABS.MAIN_2}
                    <MainDisplayAct2 />
                {:else if currentTab === TABS.WORKERS}
                    <WorkersTab />
                {:else if currentTab === TABS.SCIENCE}
                    <ScienceTab />
                {:else if currentTab === TABS.BARRACKS}
                    <BarracksTab />
                {:else if currentTab === TABS.EXPEDITION}
                    <ExpeditionTab />
                {:else if currentTab === TABS.MAIN_1}
                    <MainDisplay />
                {:else if currentTab === TABS.CHARACTER_CHOICE}
                    <CharacterChoice />
                {/if}
            </div>
        </div>
    </div>
    <DialogueBox />
    <InfoBox />
</div>

<style>
    .w-min-1070px {
        min-width: 1070px;
    }

    .w-min-730px {
        min-width: 730px;
    }

    .h-min-550px {
        min-height: 550px;
    }

    .mt-68px {
        margin-top: 68px;
    }
</style>
