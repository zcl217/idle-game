<script lang="ts">
    import InfoBoxButton from "~/components/InfoBoxButton.svelte";
    import { BUTTON_CATEGORIES } from "~/constants/buttons/buttons";
    import { MILITARY_BUTTON_TYPES } from "~/constants/buttons/militaryButtons";
    import type { ISprite } from "~/interfaces/military/sprite";
    import FramedSprite from "./FramedSprite.svelte";

    export let sprite: ISprite,
        unitCount = 0;

    const BUTTON_WIDTH = 145;

    // these will get long so either need a map
    // or put the huge switch cases in a separate utils file
    // need to think about how we're going to design the data structures for our
    // deployable units
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
        return MILITARY_BUTTON_TYPES.TRAIN_HEAVY_INFANTRY;
    };

    const getUpgradeButtonType = () => {
        switch (sprite.spriteInfo.unitType) {
        }
        return MILITARY_BUTTON_TYPES.UPGRADE_HEAVY_INFANTRY;
    };
</script>

<div>
    <div class="relative ml-4 justify-self-center">
        <p class="w-32 text-center">{sprite.spriteInfo.name}</p>
        <div class="flex flex-row">
            <FramedSprite {sprite} />
            <div class="my-auto ml-4">
                <p>HP: {sprite.spriteInfo.maxHp}</p>
                <p>Damage: {sprite.spriteInfo.damage}</p>
                <p>Units: {unitCount}</p>
            </div>
        </div>
    </div>

    <InfoBoxButton
        handler={trainUnit}
        width={BUTTON_WIDTH}
        curButtonType={getTrainButtonType()}
        curButtonCategory={BUTTON_CATEGORIES.MILITARY}
    />
    <InfoBoxButton
        handler={upgradeUnit}
        width={BUTTON_WIDTH}
        curButtonType={getUpgradeButtonType()}
        curButtonCategory={BUTTON_CATEGORIES.MILITARY}
    />
</div>
