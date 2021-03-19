<script lang="ts">
    import {
        displayInfoBox,
        buttonType,
        buttonPositionX,
        buttonPositionY,
    } from "../store/infoBox.js";
    import { buttonTexts } from "../constants/buttons.js";
    export let handler: any, curButtonType: number;

    let button: Element;
    const enter = () => {
        displayInfoBox.set(true);
        buttonType.set(curButtonType)
        const bounds = button.getBoundingClientRect();
        buttonPositionX.set(bounds.left);
        buttonPositionY.set(bounds.top + bounds.height / 2);
    };
    const leave = () => {
        //hide infobox
        displayInfoBox.set(false);
    };
</script>

<button
    class="m-3 mx-2 rpgui-button"
    type="button"
    bind:this={button}
    on:click={handler}
    on:mouseenter={enter}
    on:mouseleave={leave}
>
    <p>{buttonTexts[curButtonType]}</p>
</button>
