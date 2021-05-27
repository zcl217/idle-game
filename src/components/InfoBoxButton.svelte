<script lang="ts">
    import {
        displayInfoBox,
        buttonType,
        buttonCategory,
        buttonPositionX,
        buttonPositionY,
    } from "../store/infoBox.js";
    import {
        BUTTON_CATEGORIES,
        OTHER_BUTTON_TEXTS,
        BUTTON_WIDTH
    } from "~/constants/buttons/buttons";
    import { EMPIRE_BUTTON_TEXTS } from "~/constants/buttons/empireButtons";
    import { SCIENCE_BUTTON_TEXTS } from "~/constants/buttons/scienceButtons";
    import { MILITARY_BUTTON_TEXTS } from "~/constants/buttons/militaryButtons";
    import { onDestroy } from "svelte";
    export let handler: any,
        curButtonType: string,
        width: number = BUTTON_WIDTH,
        curButtonCategory: string;

    let button: Element;
    const showInfoBox = () => {
        displayInfoBox.set(true);
        buttonType.set(curButtonType);
        buttonCategory.set(curButtonCategory);
        const bounds = button.getBoundingClientRect();
        buttonPositionX.set(bounds.left);
        buttonPositionY.set(bounds.top + bounds.height / 2);
    };
    const hideInfoBox = () => {
        //hide infobox
        displayInfoBox.set(false);
    };
    onDestroy(() => {
        hideInfoBox();
    });
</script>

<button
    style="width: {width}px"
    class="m-3 mx-2 rpgui-button"
    type="button"
    bind:this={button}
    on:click={handler}
    on:mouseenter={showInfoBox}
    on:mouseleave={hideInfoBox}
>
    {#if curButtonCategory === BUTTON_CATEGORIES.OTHER}
        <p>{OTHER_BUTTON_TEXTS[curButtonType]}</p>
    {:else if curButtonCategory === BUTTON_CATEGORIES.EMPIRE}
        <p>{EMPIRE_BUTTON_TEXTS[curButtonType]}</p>
    {:else if curButtonCategory === BUTTON_CATEGORIES.SCIENCE}
        <p>{SCIENCE_BUTTON_TEXTS[curButtonType]}</p>
    {:else if curButtonCategory === BUTTON_CATEGORIES.MILITARY}
        <p>{MILITARY_BUTTON_TEXTS[curButtonType]}</p>
    {/if}
</button>
