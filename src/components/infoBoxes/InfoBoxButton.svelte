<script lang="ts">
    import {
        displayInfoBox,
        buttonType,
        buttonCategory,
        buttonPositionX,
        buttonPositionY,
    } from "~/store/infoBox";
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
        TRAIN_BUTTONS,
    } from "~/constants/buttons/militaryButtons";
    import {
        OTHER_BUTTON_TEXTS,
        OTHER_BUTTON_TYPES,
    } from "~/constants/buttons/otherButtons";
    import { onDestroy } from "svelte";
    import { researchedSciences } from "~/store/gameState";
    import { INFO_BOX_TYPES } from "~/constants/infoBoxes";

    const LONG_NAMES: Set<String> = new Set<String>([
        SCIENCE_BUTTON_TYPES.CONSCRIPTION,
        SCIENCE_BUTTON_TYPES.THUNDERSTICKS,
    ]);

    export let handler: any = () => {},
        curButtonType: string,
        width: number = BUTTON_WIDTH,
        curButtonCategory: string,
        unitCount: number = 3,
        infoBoxButtonType: string = INFO_BOX_TYPES.RESOURCE;

    let button: Element;
    let disabled = false;
    $: if (disabled) hideInfoBox();
    $: {
        if (TRAIN_BUTTONS.has(curButtonType)) {
            let unitCap = 3;
            // if ($researchedSciences.has(SCIENCE_BUTTON_TYPES.STANDING_ARMY)) unitCap++;
            disabled = unitCount >= unitCap;
            if (!$researchedSciences.has(SCIENCE_BUTTON_TYPES.CONSCRIPTION)) {
                disabled = true;
            }
        } else {
            switch (curButtonType) {
                case MILITARY_BUTTON_TYPES.UPGRADE_HEAVY_INFANTRY:
                    if (
                        !$researchedSciences.has(
                            SCIENCE_BUTTON_TYPES.STUDY_SINATRA_ARTIFACT
                        )
                    )
                        disabled = true;
                    break;
                case MILITARY_BUTTON_TYPES.UPGRADE_PIKEMAN:
                    if (
                        !$researchedSciences.has(
                            SCIENCE_BUTTON_TYPES.STUDY_ADUN_ARTIFACT
                        )
                    )
                        disabled = true;
                    break;
                case MILITARY_BUTTON_TYPES.UPGRADE_MAGE:
                    if (
                        !$researchedSciences.has(
                            SCIENCE_BUTTON_TYPES.STUDY_AEDUS_TOME_ARTIFACT
                        )
                    )
                        disabled = true;
                    break;
                case MILITARY_BUTTON_TYPES.UPGRADE_SHOCKTROOPER:
                    if (
                        !$researchedSciences.has(
                            SCIENCE_BUTTON_TYPES.STUDY_LUTAREZ_ARTIFACT
                        )
                    )
                        disabled = true;
                    break;
                case OTHER_BUTTON_TYPES.LORD_2:
                case MILITARY_BUTTON_TYPES.DISABLED_TRAIN:
                case MILITARY_BUTTON_TYPES.DISABLED_UPGRADE:
                    disabled = true;
                    break;
                default:
                    break;
            }
        }
    }
    const handleButtonClick = () => {
        handler();
        switch (curButtonType) {
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
    };
    const showInfoBox = () => {
        if (disabled) return;
        displayInfoBox.set(true);
        buttonType.set(curButtonType);
        buttonCategory.set(curButtonCategory);
        const bounds = button.getBoundingClientRect();
        let marginLeft = 0;
        let marginTop = 0;
        marginLeft = bounds.left;
        marginTop = bounds.top + bounds.height / 2;
        buttonPositionX.set(marginLeft);
        buttonPositionY.set(marginTop);
    };
    const hideInfoBox = () => {
        displayInfoBox.set(false);
    };
    onDestroy(() => {
        hideInfoBox();
    });
</script>

{#if infoBoxButtonType === INFO_BOX_TYPES.RESOURCE}
    <button
        style="width: {width}px"
        class="m-3 mx-2 rpgui-button {LONG_NAMES.has(curButtonType)
            ? 'text-xs'
            : ''}"
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
{:else}
    <div
        class="z-10 flex items-center justify-center p-0 mt-1 button-style"
        bind:this={button}
        on:mouseenter={showInfoBox}
        on:mouseleave={hideInfoBox}
    >
        <p>Ability</p>
    </div>
{/if}

<style>
    .button-style {
        overflow: hidden;
        background: url("../img/button-golden.png") center no-repeat no-repeat;
        background-clip: padding-box;
        background-origin: padding-box;
        background-size: 100% 100%;
        font-size: 1em;
        width: 140px;
        height: 50px;
    }
    .mt-1 {
        margin-top: 0.25rem;
    }
    .text-xs {
        font-size: 0.75rem;
    }
</style>
