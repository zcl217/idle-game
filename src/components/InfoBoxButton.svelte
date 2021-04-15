<script lang="ts">
    import {
        displayInfoBox,
        buttonType,
        buttonCategory,
        buttonPositionX,
        buttonPositionY,
    } from "../store/infoBox.js";
    import {
        buttonCategories,
        otherButtonTexts,
    } from "~/constants/buttons/buttons";
    import { empireButtonTexts } from "~/constants/buttons/empireButtons";
    import { scienceButtonTexts } from "~/constants/buttons/scienceButtons";
    import { onDestroy } from "svelte";
    export let handler: any,
        curButtonType: string,
        width: number,
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
    {#if curButtonCategory === buttonCategories.OTHER}
        <p>{otherButtonTexts[curButtonType]}</p>
    {:else if curButtonCategory === buttonCategories.EMPIRE}
        <p>{empireButtonTexts[curButtonType]}</p>
    {:else if curButtonCategory === buttonCategories.SCIENCE}
        <p>{scienceButtonTexts[curButtonType]}</p>
    {/if}
</button>
