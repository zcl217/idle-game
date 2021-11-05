<script lang="ts">
    import InfoBoxButton from "~/components/infoBoxes/InfoBoxButton.svelte";
    import { BUTTON_CATEGORIES } from "~/constants/buttons/buttons";
    import {
        MILITARY_BUTTON_COSTS,
        MILITARY_BUTTON_TYPES,
    } from "~/constants/buttons/militaryButtons";
    import { INFO_BOX_TYPES } from "~/constants/infoBoxes";
    import { UNIT_TYPES } from "~/constants/military/units/unitTypes";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { militaryUnitList, selectedMilitaryUnits } from "~/store/military";
    import { resources } from "~/store/resources";
    import { getUnitLineType } from "~/utils/helpers";
    import {
        hasEnoughResources,
        spendResources,
    } from "~/utils/resourceHelpers";
    import FramedSprite from "./FramedSprite.svelte";

    const BUTTON_WIDTH = 145;
    const MILITARY_UPGRADE_MAP: Record<string, string> = {
        [UNIT_TYPES.SPEARMAN]: UNIT_TYPES.PIKEMAN,
        [UNIT_TYPES.PIKEMAN]: UNIT_TYPES.HALBERDIER,
        [UNIT_TYPES.FOOTPAD]: UNIT_TYPES.OUTLAW,
        [UNIT_TYPES.HEAVY_INFANTRY]: UNIT_TYPES.SHOCKTROOPER,
        [UNIT_TYPES.SHOCKTROOPER]: UNIT_TYPES.SIEGETROOPER,
        [UNIT_TYPES.MAGE]: UNIT_TYPES.ARCH_MAGE,
        [UNIT_TYPES.THUNDERER]: UNIT_TYPES.THUNDERGUARD,
        [UNIT_TYPES.THUNDERGUARD]: UNIT_TYPES.DRAGONGUARD,
    };
    export let sprite: ISprite;
    let unitCount = 0;
    let unitType = sprite.spriteInfo.unitType;
    $: {
        unitCount = $militaryUnitList[getUnitLineType(unitType)].count;
    }

    const trainUnit = () => {
        const buttonType = getTrainButtonType();
        if (!hasEnoughResources(MILITARY_BUTTON_COSTS, $resources, buttonType))
            return;
        militaryUnitList.incrementMilitaryUnitCount(getUnitLineType(unitType));
        spendResources(MILITARY_BUTTON_COSTS, resources, buttonType);
    };

    const upgradeUnit = () => {
        const buttonType = getUpgradeButtonType();
        if (!hasEnoughResources(MILITARY_BUTTON_COSTS, $resources, buttonType))
            return;
        updateUnitType();
        spendResources(MILITARY_BUTTON_COSTS, resources, buttonType);
        curUpgradeButtonType = getUpgradeButtonType();
    };

    const updateUnitType = () => {
        if (MILITARY_UPGRADE_MAP[unitType]) {
            let newUnitType = MILITARY_UPGRADE_MAP[unitType];
            militaryUnitList.updateMilitaryUnitType(unitType, newUnitType);
            selectedMilitaryUnits.updateUnit(unitType, newUnitType);
            unitType = newUnitType;
        }
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
            case UNIT_TYPES.THUNDERER:
            case UNIT_TYPES.THUNDERGUARD:
            case UNIT_TYPES.DRAGONGUARD:
                return MILITARY_BUTTON_TYPES.TRAIN_THUNDERER;
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
            case UNIT_TYPES.THUNDERER:
            case UNIT_TYPES.THUNDERGUARD:
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
                {#if !sprite.spriteInfo.melee}
                    <p> Range: {sprite.spriteInfo.attackRange} </p>
                {/if}
                {#if sprite.spriteInfo.specialAbility}
                    <InfoBoxButton
                        width={BUTTON_WIDTH}
                        curButtonType={sprite.spriteInfo.specialAbility}
                        curButtonCategory={BUTTON_CATEGORIES.EXPEDITION}
                        infoBoxButtonType={INFO_BOX_TYPES.ABILITY}
                    />
                {/if}
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
