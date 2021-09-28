import { SCIENCE_BUTTON_PREREQS, SCIENCE_BUTTON_TYPES } from '~/constants/buttons/scienceButtons';
import { EMPIRE_BUTTON_PREREQS } from '~/constants/buttons/empireButtons';
import { get } from 'svelte/store';
import {
    researchedSciences as researchedSciencesFromStore,
    curStoryProgress,
} from '~/store/gameState';
import { obtainedResources as obtainedResourcesFromStore } from '~/store/resources';
import { completedCollections as completedCollectionsFromStore } from '~/store/library';
import { BUTTON_CATEGORIES } from '~/constants/buttons/buttons';
import * as humanUnits from '~/constants/military/units/humans';
import * as dwarvenUnits from '~/constants/military/units/dwarves';
import { UNIT_TYPES } from '~/constants/military/units/unitTypes'
import type { ICoordinates, IPrereqsList } from '~/interfaces/common';
import type { ISprite } from '~/interfaces/military/sprite';
import { SPRITE_SIZES } from '~/constants/military/sprites';
import { STAGE_LIST } from '~/constants/military/stageList';
import { PROJECTILE_TYPES, THUNDERSTICK_BLAST_HEIGHT, THUNDERSTICK_BLAST_WIDTH } from '~/constants/military/projectiles';
import { ENEMY_SPAWN_LIST } from '~/constants/military/enemySpawnList';
import { cloneDeep } from 'lodash';
import type { PreviewInfo } from '~/interfaces/military/enemySpawnInfo';

export const buttonPrereqsMet = (type: string, buttonCategory: string): boolean => {
    let prereqList = {} as IPrereqsList;
    switch (buttonCategory) {
        case BUTTON_CATEGORIES.EMPIRE:
            prereqList = EMPIRE_BUTTON_PREREQS;
            break;
        case BUTTON_CATEGORIES.SCIENCE:
            prereqList = SCIENCE_BUTTON_PREREQS;
            break;
        default:
            return false;
    }
    if (!prereqList[type]) return false;
    const { sciencePrereqs } = prereqList[type]
    const { resourcePrereqs } = prereqList[type]
    const researchedSciences = get(researchedSciencesFromStore);
    const obtainedResources = get(obtainedResourcesFromStore);
    for (const science of sciencePrereqs) {
        if (!researchedSciences.has(science)) return false;
    }
    for (const resource of resourcePrereqs) {
        if (!obtainedResources.has(resource)) return false;
    }
    if (prereqList[type].storyPrereq) {
        return get(curStoryProgress) >= prereqList[type].storyPrereq;
    }
    if (prereqList[type].collectionsPrereq) {
        const completedCollections = get(completedCollectionsFromStore);
        for (const collection of prereqList[type].collectionsPrereq) {
            if (!completedCollections.has(collection)) return false;
        }
    }

    return true;
}

export const getSprite = (input: string): ISprite => {
    switch (input) {
        case UNIT_TYPES.SPEARMAN:
            return humanUnits.SPEARMAN;
        case UNIT_TYPES.PIKEMAN:
            return humanUnits.PIKEMAN;
        case UNIT_TYPES.HALBERDIER:
            return humanUnits.HALBERDIER;
        case UNIT_TYPES.FOOTPAD:
            return humanUnits.FOOTPAD;
        case UNIT_TYPES.OUTLAW:
            return humanUnits.OUTLAW;
        case UNIT_TYPES.HEAVY_INFANTRY:
            return humanUnits.HEAVY_INFANTRY;
        case UNIT_TYPES.SHOCKTROOPER:
            return humanUnits.SHOCKTROOPER;
        case UNIT_TYPES.SIEGETROOPER:
            return humanUnits.SIEGETROOPER;
        case UNIT_TYPES.MAGE:
            return humanUnits.MAGE;
        case UNIT_TYPES.ARCH_MAGE:
            return humanUnits.ARCH_MAGE;
        case UNIT_TYPES.THUNDERER:
            return dwarvenUnits.THUNDERER;
        case UNIT_TYPES.THUNDERGUARD:
            return {} as ISprite;
        case UNIT_TYPES.DRAGONGUARD:
            return {} as ISprite;
        default:
            return {} as ISprite;
    }
}

export const getExpeditionBackgroundPosition = (sprite: ISprite): string => {
    return `${sprite.position.spriteSheetPositionX}px ${sprite.position.spriteSheetPositionY}px`;
};

export const getSpriteBackgroundPosition = (
    sprite: ISprite,
    idleFrames: ICoordinates[],
    currentFrame: number,
    isAnimating: boolean
): string => {
    // additional offset required to properly center type 2 sprites
    const nonAnimatingOffsetX = !isAnimating && sprite.spriteInfo.spriteSize === SPRITE_SIZES.TYPE_2 ? 10 : 0;
    const nonAnimatingOffsetY = !isAnimating && sprite.spriteInfo.spriteSize === SPRITE_SIZES.TYPE_2 ? 15 : 0;
    const spriteSheetPosition = idleFrames[currentFrame];
    const spriteSheetPositionX =
        spriteSheetPosition.col * -sprite.spriteInfo.spriteSize.x +
        (sprite.position.spriteSheetOffsetX || 0) / 1.5 - nonAnimatingOffsetX;
    const spriteSheetPositionY =
        spriteSheetPosition.row * -sprite.spriteInfo.spriteSize.y - nonAnimatingOffsetY;
    return `${spriteSheetPositionX}px ${spriteSheetPositionY}px`;
}

export const getProjectileBackgroundPosition = (
    type: string,
    attackFrames: ICoordinates[],
    currentFrame: number,
): string => {
    let width = 0;
    let height = 0;
    switch (type) {
        case PROJECTILE_TYPES.THUNDERSTICK_BLAST:
            width = THUNDERSTICK_BLAST_WIDTH;
            height = THUNDERSTICK_BLAST_HEIGHT;
            break;
        default:
            return '0px 0px';
    }
    const spriteSheetPosition = attackFrames[currentFrame];
    const spriteSheetPositionX =
        spriteSheetPosition.col * -width;
    const spriteSheetPositionY =
        spriteSheetPosition.row * -height;
    return `${spriteSheetPositionX}px ${spriteSheetPositionY}px`;
}

export const areAllZoneStagesCleared = (
    zone: string,
    clearedStages: Record<string, boolean>
): boolean => {
    switch (zone) {
        case "1":
            return (
                clearedStages[STAGE_LIST["1-1"]] &&
                clearedStages[STAGE_LIST["1-2"]] &&
                clearedStages[STAGE_LIST["1-3"]] &&
                clearedStages[STAGE_LIST["1-4"]] &&
                clearedStages[STAGE_LIST["1-5"]]
            );
        case "2":
            return (
                clearedStages[STAGE_LIST["2-1"]] &&
                clearedStages[STAGE_LIST["2-2"]] &&
                clearedStages[STAGE_LIST["2-3"]] &&
                clearedStages[STAGE_LIST["2-4"]] &&
                clearedStages[STAGE_LIST["2-5"]]
            );
        case "3":
            return (
                clearedStages[STAGE_LIST["3-1"]] &&
                clearedStages[STAGE_LIST["3-2"]] &&
                clearedStages[STAGE_LIST["3-3"]] &&
                clearedStages[STAGE_LIST["3-4"]] &&
                clearedStages[STAGE_LIST["3-5"]]
            );
        default:
            return;
    }
};

export const generatePreviewList = (stageList: string): PreviewInfo[] => {
    const previewList: PreviewInfo[] = [] as PreviewInfo[];
    if (!ENEMY_SPAWN_LIST[stageList]) return previewList;
    const spawnList = cloneDeep(ENEMY_SPAWN_LIST[stageList]);
    for (let a = spawnList.length - 1; a >= 0;) {
        const currentUnit = spawnList[a].enemyUnit;
        let amount = spawnList[a].amount;
        spawnList.splice(a, 1);
        for (let b = a - 1; b >= 0; b--) {
            if (spawnList[b].enemyUnit === currentUnit) {
                amount += spawnList[b].amount;
                spawnList.splice(b, 1);
            }
        }
        previewList.push({
            sprite: currentUnit,
            amount
        });
        a = spawnList.length - 1;
    }
    return previewList;
}

export const displayUnit = (unitType: string, researchedSciences: Set<string>): boolean => {
    switch (unitType) {
        case UNIT_TYPES.FOOTPAD:
            return researchedSciences.has(SCIENCE_BUTTON_TYPES.SLINGSHOTS);
        case UNIT_TYPES.HEAVY_INFANTRY:
            return researchedSciences.has(
                SCIENCE_BUTTON_TYPES.HEAVY_INFANTRY
            );
        case UNIT_TYPES.MAGE:
            return researchedSciences.has(SCIENCE_BUTTON_TYPES.MAGIC);
        case UNIT_TYPES.THUNDERER:
            return researchedSciences.has(SCIENCE_BUTTON_TYPES.THUNDERSTICKS);
        default:
            return true;
    }
};

export const getUnitLineType = (unitType: string): string => {
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
        case UNIT_TYPES.THUNDERER:
        case UNIT_TYPES.THUNDERGUARD:
        case UNIT_TYPES.DRAGONGUARD:
            return UNIT_TYPES.THUNDERER;
        default:
            break;
    }
};