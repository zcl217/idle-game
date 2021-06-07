<script lang="ts">
    import {
        displayInfoBox,
        buttonType,
        buttonCategory,
        buttonPositionX,
        buttonPositionY,
    } from "../store/infoBox";
    import {
        BUTTON_CATEGORIES,
        BUTTON_WIDTH,
    } from "~/constants/buttons/buttons";
    import { EMPIRE_BUTTON_TEXTS } from "~/constants/buttons/empireButtons";
    import {
        SCIENCE_BUTTON_TEXTS,
        SCIENCE_BUTTON_TYPES,
    } from "~/constants/buttons/scienceButtons";
    import {
        MILITARY_BUTTON_TEXTS,
        MILITARY_BUTTON_TYPES,
    } from "~/constants/buttons/militaryButtons";
    import {
        OTHER_BUTTON_TEXTS,
        OTHER_BUTTON_TYPES,
    } from "~/constants/buttons/otherButtons";
    import { onDestroy } from "svelte";
    import { researchedSciences } from "~/store/gameState";
    export let handler: any,
        curButtonType: string,
        width: number = BUTTON_WIDTH,
        curButtonCategory: string,
        unitCount: number = 3;

    let button: Element;
    let disabled = false;
    $: if (disabled) hideInfoBox();
    $: {
        switch (curButtonType) {
            case OTHER_BUTTON_TYPES.LORD_2:
            case MILITARY_BUTTON_TYPES.DISABLED_TRAIN:
            case MILITARY_BUTTON_TYPES.DISABLED_UPGRADE:
                disabled = true;
                break;
            case MILITARY_BUTTON_TYPES.TRAIN_HALBERDIER:
            case MILITARY_BUTTON_TYPES.TRAIN_HEAVY_INFANTRY:
            case MILITARY_BUTTON_TYPES.TRAIN_PIKEMAN:
            case MILITARY_BUTTON_TYPES.TRAIN_FOOTPAD:
            case MILITARY_BUTTON_TYPES.TRAIN_OUTLAW:
            case MILITARY_BUTTON_TYPES.TRAIN_SHOCKTROOPER:
            case MILITARY_BUTTON_TYPES.TRAIN_SIEGETROOPER:
            case MILITARY_BUTTON_TYPES.TRAIN_SPEARMAN:
            case MILITARY_BUTTON_TYPES.TRAIN_MAGE:
                if (
                    !$researchedSciences.has(SCIENCE_BUTTON_TYPES.CONSCRIPTION)
                ) {
                    disabled = true;
                }
                disabled = unitCount >= 3;
                break;
            case MILITARY_BUTTON_TYPES.UPGRADE_SPEARMAN:
            case MILITARY_BUTTON_TYPES.UPGRADE_PIKEMAN:
            case MILITARY_BUTTON_TYPES.UPGRADE_FOOTPAD:
            case MILITARY_BUTTON_TYPES.UPGRADE_HEAVY_INFANTRY:
            case MILITARY_BUTTON_TYPES.UPGRADE_SHOCKTROOPER:
            case MILITARY_BUTTON_TYPES.UPGRADE_MAGE:
                if (!$researchedSciences.has(SCIENCE_BUTTON_TYPES.ART_OF_WAR)) {
                    disabled = true;
                }
                break;
            default:
                break;
        }
    }
    const handleButtonClick = () => {
        handler();
        switch(curButtonType) {
            case MILITARY_BUTTON_TYPES.UPGRADE_SPEARMAN:
            case MILITARY_BUTTON_TYPES.UPGRADE_PIKEMAN:
            case MILITARY_BUTTON_TYPES.UPGRADE_FOOTPAD:
            case MILITARY_BUTTON_TYPES.UPGRADE_HEAVY_INFANTRY:
            case MILITARY_BUTTON_TYPES.UPGRADE_SHOCKTROOPER:
            case MILITARY_BUTTON_TYPES.UPGRADE_MAGE:
                hideInfoBox();
                break;
            default:
                break;
        }
    }
    const showInfoBox = () => {
        displayInfoBox.set(true);
        buttonType.set(curButtonType);
        buttonCategory.set(curButtonCategory);
        const bounds = button.getBoundingClientRect();
        buttonPositionX.set(bounds.left);
        buttonPositionY.set(bounds.top + bounds.height / 2);
    };
    const hideInfoBox = () => {
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
    {disabled}
    bind:this={button}
    on:click={handleButtonClick}
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
