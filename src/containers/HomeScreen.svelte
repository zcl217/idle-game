<script>
    import { watchResize } from "svelte-watch-resize";
    import MenuTabs from "./MenuTabs.svelte";
    import ResourceOverview from "~/components/ResourceOverview.svelte";
    import MainDisplay from "~/components/displayTabs/MainDisplay.svelte";
    import MainDisplayAct2 from "~/components/displayTabs/MainDisplayAct2.svelte";
    import ResourcesTab from "~/components/displayTabs/ResourcesTab.svelte";
    import ScienceTab from "~/components/displayTabs/ScienceTab.svelte";
    import BarracksTab from "~/components/displayTabs/BarracksTab.svelte";
    import ExpeditionTab from "~/components/displayTabs/ExpeditionTab.svelte";
    import SaveTab from "~/components/displayTabs/SaveTab.svelte";
    import MessageLog from "~/components/MessageLog.svelte";
    import DialogueBox from "~/components/DialogueBox.svelte";
    import InfoBox from "~/components/infoBoxes/InfoBox.svelte";
    import { TABS } from "~/constants/buttons/buttons";
    import CharacterChoice from "~/components/displayTabs/CharacterChoice.svelte";
    import { curStoryProgress, inExpedition } from "~/store/gameState";
    import UnitDeploymentTab from "~/components/UnitDeploymentTab.svelte";
    import { STORY_PROGRESS_LIST } from "~/constants/story";
    import ResourceInfoBox from "~/components/infoBoxes/ResourceInfoBox.svelte";
    import { onMount } from "svelte";
    let darkBackground = true,
        currentTab = TABS.MAIN_1,
        displayMain1 = true,
        inCharacterChoice = false,
        displayScreen,
        displayScreenHeight;

    onMount(() => {
        displayScreenHeight = displayScreen?.getBoundingClientRect().height;
    });

    const toggleTab = (payload) => {
        currentTab = payload.detail;
    };

    if (process.env.isDev) curStoryProgress.set(STORY_PROGRESS_LIST["A2S12"]);

    // TODO: if you're currently in main2 and you load a main1 save,
    // the worker tab isn't toggled off
    $: {
        if ($curStoryProgress === STORY_PROGRESS_LIST["A1S5"]) {
            currentTab = TABS.CHARACTER_CHOICE;
            inCharacterChoice = true;
            console.log(inCharacterChoice);
        }
        if ($curStoryProgress >= STORY_PROGRESS_LIST["A2S12"]) {
            currentTab = TABS.MAIN_2;
            displayMain1 = false;
            inCharacterChoice = false;
        }
    }

    $: displayScreenHeight = displayScreen?.getBoundingClientRect().height;

    const handleResize = () => {
        displayScreenHeight = displayScreen?.getBoundingClientRect().height;
    };
</script>

<div class="overflow-auto bg-gray-800 rpgui-content w-min-1300px">
    <!--
        class:bg-gray-300={darkBackground === false}
    class:bg-gray-800={darkBackground === true}
-->
    <!-- <div
        class="absolute top-5 right-5 rpgui-cursor-point"
        class:text-white={darkBackground === true}
        on:click={() => (darkBackground = !darkBackground)}
    >
        toggle lights
    </div> -->
    <div class="flex">
        <div class="w-3/12 h-full m-5 mr-0">
            {#if $inExpedition}
                <UnitDeploymentTab />
            {:else}
                <ResourceOverview />
            {/if}
        </div>
        <div class="ml-5">
            {#if !$inExpedition && !inCharacterChoice}
                <MenuTabs
                    {currentTab}
                    {displayMain1}
                    on:toggleTab={toggleTab}
                />
            {:else}
                <div class="mt-68px" />
            {/if}
            <div
                class="w-8/12 overflow-x-hidden w-min-840px h-min-620px h-5/6 rpgui-container framed-golden-2 {currentTab ===
                    TABS.EXPEDITION
                        ? 'overflow-y-hidden'
                        : 'overflow-y-auto'}"
                bind:this={displayScreen}
                use:watchResize={handleResize}
            >
                {#if currentTab === TABS.MAIN_2}
                    <MainDisplayAct2 />
                {:else if currentTab === TABS.WORKERS}
                    <ResourcesTab />
                {:else if currentTab === TABS.SCIENCE}
                    <ScienceTab />
                {:else if currentTab === TABS.BARRACKS}
                    <BarracksTab />
                {:else if currentTab === TABS.EXPEDITION}
                    <ExpeditionTab />
                {:else if currentTab === TABS.SAVE}
                    <SaveTab />
                {:else if currentTab === TABS.MAIN_1}
                    <MainDisplay />
                {:else if currentTab === TABS.CHARACTER_CHOICE}
                    <CharacterChoice />
                {/if}
            </div>
        </div>
    </div>
    <DialogueBox />
    <InfoBox {displayScreenHeight} />
    <ResourceInfoBox />
</div>

<style>
    .w-min-1300px {
        min-width: 1300px;
    }

    .w-min-840px {
        min-width: 840px;
    }

    .h-min-620px {
        min-height: 620px;
    }

    .mt-68px {
        margin-top: 68px;
    }
    .overflow-x-hidden {
        overflow-x: hidden;
    }
    .overflow-y-hidden {
        overflow-y: hidden;
    }
    ::-webkit-scrollbar {
        width: 12px; /* width of the entire scrollbar */
    }

    ::-webkit-scrollbar-track {
        background: #be6714; /* color of the tracking area */
        border-radius: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: white; /* color of the scroll thumb */
        border-radius: 20px; /* roundness of the scroll thumb */
        border: 3px solid #be6714; /* creates padding around scroll thumb */
    }
</style>
