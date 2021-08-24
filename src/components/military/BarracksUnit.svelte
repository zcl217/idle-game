<script lang="ts">
    import InfoBoxButton from "~/components/infoBoxes/InfoBoxButton.svelte";
    import { BUTTON_CATEGORIES } from "~/constants/buttons/buttons";
    import {
        MILITARY_BUTTON_COSTS,
        MILITARY_BUTTON_TYPES,
    } from "~/constants/buttons/militaryButtons";
    import { UNIT_TYPES } from "~/constants/military/units/unitTypes";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { militaryUnitList } from "~/store/military";
    import { resources } from "~/store/resources";
    import {
        hasEnoughResources,
        spendResources,
    } from "~/utils/resourceHelpers";
    import FramedSprite from "./FramedSprite.svelte";

    const BUTTON_WIDTH = 145;
    export let sprite: ISprite;
    let unitCount = 0;
    let unitType = sprite.spriteInfo.unitType;
    $: {
        unitCount = $militaryUnitList[getUnitLineType()].count;
    }
    const getUnitLineType = () => {
        switch (unitType) {
            case UNIT_TYPES.SPEARMAN:
            case UNIT_TYPES.PIKEMAN:
            case UNIT_TYPES.HALBERDIER:
                return UNIT_TYPES.SPEARMAN;
            case UNIT_TYPES.FOOTPAD:
            case UNIT_TYPES.OUTLAW:
                return UNIT_TYPES.FOOTPAD;
            case UNIT_TYPES.HEAVY_INFANTRY:
            case UNIT_TYPES.SHOCKTROOPER:
            case UNIT_TYPES.SIEGETROOPER:
                return UNIT_TYPES.HEAVY_INFANTRY;
            case UNIT_TYPES.MAGE:
            case UNIT_TYPES.ARCH_MAGE:
                return UNIT_TYPES.MAGE;
            default:
                break;
        }
    };

    const trainUnit = () => {
        const buttonType = getTrainButtonType();
        if (!hasEnoughResources(MILITARY_BUTTON_COSTS, $resources, buttonType))
            return;
        militaryUnitList.incrementMilitaryUnitCount(getUnitLineType());
        spendResources(MILITARY_BUTTON_COSTS, resources, buttonType);
    };

    const upgradeUnit = () => {
        const buttonType = getUpgradeButtonType();
        switch (unitType) {
            case UNIT_TYPES.SPEARMAN:
                if (
                    !hasEnoughResources(
                        MILITARY_BUTTON_COSTS,
                        $resources,
                        buttonType
                    )
                )
                    return;
                militaryUnitList.updateMilitaryUnitType(
                    UNIT_TYPES.SPEARMAN,
                    UNIT_TYPES.PIKEMAN
                );
                unitType = UNIT_TYPES.PIKEMAN;
                break;
            case UNIT_TYPES.PIKEMAN:
                if (
                    !hasEnoughResources(
                        MILITARY_BUTTON_COSTS,
                        $resources,
                        buttonType
                    )
                )
                    return;
                militaryUnitList.updateMilitaryUnitType(
                    UNIT_TYPES.SPEARMAN,
                    UNIT_TYPES.HALBERDIER
                );
                unitType = UNIT_TYPES.HALBERDIER;
                break;
            case UNIT_TYPES.FOOTPAD:
                if (
                    !hasEnoughResources(
                        MILITARY_BUTTON_COSTS,
                        $resources,
                        buttonType
                    )
                )
                    return;
                militaryUnitList.updateMilitaryUnitType(
                    UNIT_TYPES.FOOTPAD,
                    UNIT_TYPES.OUTLAW
                );
                unitType = UNIT_TYPES.OUTLAW;
                break;
            case UNIT_TYPES.HEAVY_INFANTRY:
                if (
                    !hasEnoughResources(
                        MILITARY_BUTTON_COSTS,
                        $resources,
                        buttonType
                    )
                )
                    return;
                militaryUnitList.updateMilitaryUnitType(
                    UNIT_TYPES.HEAVY_INFANTRY,
                    UNIT_TYPES.SHOCKTROOPER
                );
                unitType = UNIT_TYPES.SHOCKTROOPER;
                break;
            case UNIT_TYPES.SHOCKTROOPER:
                if (
                    !hasEnoughResources(
                        MILITARY_BUTTON_COSTS,
                        $resources,
                        buttonType
                    )
                )
                    return;
                militaryUnitList.updateMilitaryUnitType(
                    UNIT_TYPES.HEAVY_INFANTRY,
                    UNIT_TYPES.SIEGETROOPER
                );
                unitType = UNIT_TYPES.SIEGETROOPER;
                break;
            case UNIT_TYPES.MAGE:
                if (
                    !hasEnoughResources(
                        MILITARY_BUTTON_COSTS,
                        $resources,
                        buttonType
                    )
                )
                    return;
                militaryUnitList.updateMilitaryUnitType(
                    UNIT_TYPES.MAGE,
                    UNIT_TYPES.ARCH_MAGE
                );
                unitType = UNIT_TYPES.ARCH_MAGE;
                break;
            default:
                return;
        }
        spendResources(MILITARY_BUTTON_COSTS, resources, buttonType);
        curUpgradeButtonType = getUpgradeButtonType();
    };

    const getTrainButtonType = () => {
        switch (unitType) {
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
        switch (unitType) {
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

    let curUpgradeButtonType = getUpgradeButtonType();
</script>

<div>
    <div class="relative ml-4 justify-self-center">
        <div class="flex items-center h-11">
            <p class="w-32 text-center">{sprite.spriteInfo.name}</p>
        </div>
        <div class="flex flex-row">
            <FramedSprite {sprite} shouldAnimateSprite={false} />
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
        curButtonType={curUpgradeButtonType}
        curButtonCategory={BUTTON_CATEGORIES.MILITARY}
        {unitCount}
    />
</div>
