<script>
    import MenuButtons from "./MenuButtons.svelte";
    import Resources from "../components/Resources.svelte";
    import MainDisplay from "../components/MainDisplay.svelte";
    import MessageLog from "../components/MessageLog.svelte";
    import DialogueBox from "../components/DialogueBox.svelte";
    import InfoBox from "../components/InfoBox.svelte";
    let darkBackground = true;
</script>

<div
    class="overflow-auto rpgui-content w-min-1000px"
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
        <div class="w-3/12 m-5 mr-0">
            <MessageLog />
            <Resources />
        </div>
        <div class="ml-5">
            <MenuButtons />
            <MainDisplay />
        </div>
    </div>
    <DialogueBox />
    <InfoBox />
</div>

<style>
    .w-min-1000px {
        min-width: 1000px;
    }
</style>
