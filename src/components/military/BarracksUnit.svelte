<script lang="ts">
    import InfoBoxButton from "~/components/InfoBoxButton.svelte";
    import { BUTTON_CATEGORIES } from "~/constants/buttons/buttons";
    import { MILITARY_BUTTON_TYPES } from "~/constants/buttons/militaryButtons";
    import { UNIT_TYPES } from "~/constants/military/units/unitTypes";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { militaryUnitList } from "~/store/military";
    import { resources } from "~/store/resources";
    import FramedSprite from "./FramedSprite.svelte";

    export let sprite: ISprite,
        unitCount = 0;

    const BUTTON_WIDTH = 145;

    // these will get long so either need a map
    // or put the huge switch cases in a separate utils file
    // need to think about how we're going to design the data structures for our
    // deployable units
    const trainUnit = () => {
        militaryUnitList.incrementMilitaryUnitCount(sprite.spriteInfo.unitType);
    };

    $: {
        // loop through resource and see if we have met prereq
        for (let resource in $resources) {
        }
    }
    // TODO: use object as key instead of just array? otherwise we have to loo pth
  //  $: unitCount = $militaryUnitList[sprite.spriteInfo.unitType].c

    const upgradeUnit = () => {
        switch (sprite.spriteInfo.unitType) {
            case UNIT_TYPES.SPEARMAN:
                militaryUnitList.updateMilitaryUnitType(UNIT_TYPES.SPEARMAN, UNIT_TYPES.PIKEMAN);
                break;
            case UNIT_TYPES.PIKEMAN:
                militaryUnitList.updateMilitaryUnitType(UNIT_TYPES.PIKEMAN, UNIT_TYPES.HALBERDIER);
                break;
            case UNIT_TYPES.FOOTPAD:
                militaryUnitList.updateMilitaryUnitType(UNIT_TYPES.FOOTPAD, UNIT_TYPES.OUTLAW);
                break;
            case UNIT_TYPES.HEAVY_INFANTRY:
                militaryUnitList.updateMilitaryUnitType(UNIT_TYPES.HEAVY_INFANTRY, UNIT_TYPES.SHOCKTROOPER);
                break;
            case UNIT_TYPES.SHOCKTROOPER:
                militaryUnitList.updateMilitaryUnitType(UNIT_TYPES.SHOCKTROOPER, UNIT_TYPES.SIEGETROOPER);
                break;
            case UNIT_TYPES.MAGE:
                militaryUnitList.updateMilitaryUnitType(UNIT_TYPES.MAGE, UNIT_TYPES.ARCH_MAGE);
                break;
            default:
                return;
        }
    };

    const getTrainButtonType = () => {
        switch (sprite.spriteInfo.unitType) {
            case UNIT_TYPES.SPEARMAN:
            case UNIT_TYPES.PIKEMAN:
            case UNIT_TYPES.HALBERDIER:
                return MILITARY_BUTTON_TYPES.TRAIN_SPEARMAN;
            case UNIT_TYPES.FOOTPAD:
            case UNIT_TYPES.OUTLAW:
                return MILITARY_BUTTON_TYPES.TRAIN_FOOTPAD;
            case UNIT_TYPES.HEAVY_INFANTRY:
            case UNIT_TYPES.SHOCKTROOPER:
            case UNIT_TYPES.SIEGETROOPER:
                return MILITARY_BUTTON_TYPES.TRAIN_HEAVY_INFANTRY;
            case UNIT_TYPES.MAGE:
            case UNIT_TYPES.ARCH_MAGE:
                return MILITARY_BUTTON_TYPES.TRAIN_MAGE;
            default:
                return MILITARY_BUTTON_TYPES.DISABLED_TRAIN;
        }
    };

    const getUpgradeButtonType = () => {
        switch (sprite.spriteInfo.unitType) {
            case UNIT_TYPES.SPEARMAN:
                return MILITARY_BUTTON_TYPES.UPGRADE_SPEARMAN;
            case UNIT_TYPES.PIKEMAN:
                return MILITARY_BUTTON_TYPES.UPGRADE_PIKEMAN;
            case UNIT_TYPES.FOOTPAD:
                return MILITARY_BUTTON_TYPES.UPGRADE_FOOTPAD;
            case UNIT_TYPES.HEAVY_INFANTRY:
                return MILITARY_BUTTON_TYPES.UPGRADE_HEAVY_INFANTRY;
            case UNIT_TYPES.SHOCKTROOPER:
                return MILITARY_BUTTON_TYPES.UPGRADE_SHOCKTROOPER;
            case UNIT_TYPES.MAGE:
                return MILITARY_BUTTON_TYPES.UPGRADE_MAGE;
            default:
                return MILITARY_BUTTON_TYPES.DISABLED_UPGRADE;
        }
    };
</script>

<div>
    <div class="relative ml-4 justify-self-center">
        <div class="flex items-center h-11">
            <p class="w-32 text-center">{sprite.spriteInfo.name}</p>
        </div>
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
        {unitCount}
    />
    <InfoBoxButton
        handler={upgradeUnit}
        width={BUTTON_WIDTH}
        curButtonType={getUpgradeButtonType()}
        curButtonCategory={BUTTON_CATEGORIES.MILITARY}
        {unitCount}
    />
</div>
