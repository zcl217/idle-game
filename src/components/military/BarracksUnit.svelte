<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import InfoBoxButton from "~/components/InfoBoxButton.svelte";
    import { buttonCategories } from "~/constants/buttons/buttons";
    import { militaryButtonTypes } from "~/constants/buttons/militaryButtons";
import { spriteSheetMap } from "~/constants/military/spriteSheetMap";
    import type { ISprite } from "~/interfaces/military/sprite";

    export let sprite: ISprite,
        unitCount = 0;

    const buttonWidth = 145;

    let interval = 0;
    let currentFrame = 0;
    let backgroundPosition = `${sprite.offset / 1.5}px 0px`;
    let currentPositionX = sprite.offset;
    let currentPositionY = 0;

    onMount(() => {
        interval = setInterval(() => {
            let idleFrames = spriteSheetMap[sprite.spriteInfo.unitType].idleFrames;
            if (currentFrame >= idleFrames.length) currentFrame = 0;
            const spriteSheetPosition = idleFrames[currentFrame];
            const spriteSheetPositionX =
                spriteSheetPosition.col * -sprite.spriteInfo.spriteSize.x +
                sprite.offset / 1.5;
            const spriteSheetPositionY =
                spriteSheetPosition.row * -sprite.spriteInfo.spriteSize.y;
            backgroundPosition = `${spriteSheetPositionX}px ${spriteSheetPositionY}px`;
            currentFrame++;
        }, 250);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    // these will get long so either need a map
    // or put the huge switch cases in a separate utils file
    const trainUnit = () => {
        switch (sprite.spriteInfo.unitType) {
        }
    };

    const upgradeUnit = () => {
        switch (sprite.spriteInfo.unitType) {
        }
    };

    const getTrainButtonType = () => {
        switch (sprite.spriteInfo.unitType) {
        }
        return militaryButtonTypes.TRAIN_HEAVY_INFANTRY;
    };

    const getUpgradeButtonType = () => {
        switch (sprite.spriteInfo.unitType) {
        }
        return militaryButtonTypes.UPGRADE_HEAVY_INFANTRY;
    };
</script>

<div>
    <div class="relative ml-4 justify-self-center">
        <p class="w-32 text-center">{sprite.spriteInfo.name}</p>
        <div class="flex flex-row">
            <div class="relative w-32 h-32 p-0 rpgui-container framed">
                <div
                    class="w-24 h-24"
                    style="
                        background-image: url('${spriteSheetMap[sprite.spriteInfo.unitType].spriteSheet}');
                        background-position: {backgroundPosition};
                    "
                />
            </div>
            <div class="my-auto ml-4">
                <p>HP: {sprite.spriteInfo.maxHp}</p>
                <p>Damage: {sprite.spriteInfo.damage}</p>
                <p>Units: {unitCount}</p>
            </div>
        </div>
    </div>

    <InfoBoxButton
        handler={trainUnit}
        width={buttonWidth}
        curButtonType={getTrainButtonType()}
        curButtonCategory={buttonCategories.MILITARY}
    />
    <InfoBoxButton
        handler={upgradeUnit}
        width={buttonWidth}
        curButtonType={getUpgradeButtonType()}
        curButtonCategory={buttonCategories.MILITARY}
    />
</div>
