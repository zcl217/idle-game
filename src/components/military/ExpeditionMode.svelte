<script lang="ts">
    import Sprite from "~/components/military/Sprite.svelte";
    import type { ISprite } from "~/interfaces/military/sprite";
    import {
        attackRangeCenterCoordinates,
        shouldHighlightMeleeCells,
        shouldHighlightRangedCells,
        lifeCount,
        removedEnemyUnitCount,
        unitHasBeenDeployed,
        unitToDeploy,
    } from "~/store/military";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import type { IExpeditionCell } from "~/interfaces/military/expeditionGrid";
    import ExpeditionCell from "../military/ExpeditionCell.svelte";
    import {
        setLifeCount,
        handleDamageCalculations,
        handleEnemyMovements,
        handleUnitAnimations,
        initializeEnemies,
        initializeGrid,
        initializeUnitPosition,
        handleProjectiles,
        setGridPath,
    } from "~/utils/expeditionMode";
    import type { ICoordinates } from "~/interfaces/common";
    import { cloneDeep, uniqueId } from "lodash";
    import type { IProjectile } from "~/interfaces/military/projectile";
    import Projectile from "../military/Projectile.svelte";
    import { STAGE_LIST } from "~/constants/military/stageList";
    import { rowPositionX } from "~/store/infoBox";

    export let mapType: number = 1,
        level = 1,
        stage: string = STAGE_LIST["1-1"];

    const dispatch = createEventDispatcher();

    let grid: IExpeditionCell[][] = [];
    let enemyUnits: ISprite[] = [];
    let playerUnits: ISprite[] = [];
    let projectiles: IProjectile[] = [];
    // if enemies remaining is initialized as 0, we instantly win
    let enemiesRemaining: number = 1;
    let interval = 0;
    let expeditionLevelStarted = false;

    onMount(() => {
        //  handleVictory();
        grid = initializeGrid(mapType);
        setGridPath(grid, mapType);
        setLifeCount(level, lifeCount);
        enemiesRemaining = initializeEnemies(stage, enemyUnits, grid);
        loadExpeditionLevel();
    });

    const loadExpeditionLevel = () => {
        /*
            current problem:
            if unit's movement delay is same as this delay, the game loop
            might process the enemy unit before the tweened has resolved,
            thus making the unit freeze for one loop.
            one fix is to just decrease the enemy unit delay, but then the
            movement wouldn't be perfectly smooth (since the unit would have to wait
            for the difference between game loop and their own movement delay).
            how would we fix this?
        */
        let delay = 100;
        let frame = 0;
        interval = setInterval(() => {
            frame++;
            if (expeditionLevelStarted) {
                handleDamageCalculations(
                    grid,
                    playerUnits,
                    enemyUnits,
                    projectiles
                );
                handleProjectiles(projectiles, grid, playerUnits, enemyUnits);
                /*
             if we want to implement faster/slower movements,
             we need the setinterval to be at the lowest tick (the fastest moving unit
             speed's interval) and then just ignore the mobs that are still moving 
             (which can be done by checking their state)
            */
                handleEnemyMovements(enemyUnits, grid, lifeCount);
                handleUnitAnimations(playerUnits, enemyUnits, frame);
                // when all enemies are dead, emit event to parent that stage is over
                // OR if you run out of lives,
                if (frame > 60) frame = 0;
                //
                enemyUnits = enemyUnits.sort(
                    (unitA: ISprite, unitB: ISprite) =>
                        unitB.state.currentHp - unitA.state.currentHp
                );
                // enemy units aren't removed properly sometimes so double check that
                // (TODO: find cause of the bug)
                for (let a = enemyUnits.length - 1; a >= 0; a--) {
                    if (enemyUnits[a].state.currentHp <= 0)
                        enemyUnits.splice(a, 1);
                }
                //enemyUnits = enemyUnits;
                playerUnits = playerUnits;
                grid = grid;
                projectiles = projectiles;
            } else {
                handleUnitAnimations(playerUnits, enemyUnits, frame);
                playerUnits = playerUnits;
            }
        }, delay);
    };

    onDestroy(() => {
        clearInterval(interval);
        removedEnemyUnitCount.reset();
    });

    $: {
        if ($lifeCount <= 0) {
            setTimeout(() => {
                handleDefeat();
            }, 500);
        }
    }

    $: {
        enemiesRemaining -= $removedEnemyUnitCount;
        removedEnemyUnitCount.reset();
        if (enemiesRemaining <= 0) {
            setTimeout(() => {
                handleVictory();
            }, 1000);
        }
    }

    const handleVictory = () => {
        clearInterval(interval);
        dispatch("VICTORY");
        enemiesRemaining = 1;
    };

    const handleDefeat = () => {
        clearInterval(interval);
        // set it to 1 so we don't instantly lose when we load this component
        // (since we lose when lives are 0)
        lifeCount.set(1);
        //emit to emit defeat to parent
        dispatch("DEFEAT");
        enemiesRemaining = 1;
    };

    $: {
        if ($shouldHighlightMeleeCells) {
            for (let row of grid) {
                for (let cell of row) {
                    if (meleeCellIsDeployable(cell)) {
                        cell.isDeployable = true;
                    } else {
                        cell.isDeployable = false;
                    }
                }
            }
        } else if (
            !$shouldHighlightRangedCells &&
            !$shouldHighlightMeleeCells
        ) {
            turnOffCellHighlighting();
        }
        grid = grid;
    }

    function meleeCellIsDeployable(cell: IExpeditionCell) {
        return (
            cell.isPath &&
            !cell.playerUnit &&
            !cell.startOfPath &&
            !cell.endOfPath &&
            !cell.enemyUnitArriving &&
            cell.enemyUnitList.length === 0
        );
    }

    $: {
        if ($shouldHighlightRangedCells) {
            for (let row of grid) {
                for (let cell of row) {
                    cell.highlightAttackRange = false;
                    cell.isDeployable = rangedCellIsDeployable(cell);
                }
            }
            const coordinates = $attackRangeCenterCoordinates;
            let curRow = coordinates.row;
            let curCol = coordinates.col;
            highlightAttackRange(curRow, curCol);
        } else if (
            !$shouldHighlightRangedCells &&
            !$shouldHighlightMeleeCells
        ) {
            turnOffCellHighlighting();
        }
        grid = grid;
    }

    function rangedCellIsDeployable(cell: IExpeditionCell) {
        return !cell.isPath && !cell.playerUnit && !cell.undeployableTerrain;
    }

    const highlightAttackRange = (curRow: number | undefined, curCol: number | undefined) => {
        let attackRange = $unitToDeploy.spriteInfo.attackRange;
        if (curRow !== undefined && curCol !== undefined) {
            for (let row = 0; row < grid.length; row++) {
                for (let col = 0; col < grid[0].length; col++) {
                    if (row === curRow && col === curCol) continue;
                    let rowDiff = Math.abs(curRow - row);
                    let colDiff = Math.abs(curCol - col);
                    if (rowDiff <= attackRange && colDiff <= attackRange)
                        grid[row][col].highlightAttackRange = true;
                }
            }
        }
    };

    const handleCellClick = (cell: IExpeditionCell) => {
        // check the property of cell
        if (cell.isDeployable) {
            // get the type of unit to deploy from store
            // and then deploy the unit
            turnOffCellHighlighting();
            let newPlayerUnit: ISprite = cloneDeep($unitToDeploy);
            cell.playerUnit = newPlayerUnit;
            newPlayerUnit.spriteInfo.unitId = uniqueId();
            initializeUnitPosition(
                newPlayerUnit,
                cell.coordinates.row,
                cell.coordinates.col
            );
            playerUnits.push(newPlayerUnit);
            unitHasBeenDeployed.set(true);
        }
    };

    // unitToDeploy is set in DeployableUnit.svelte to deactivate unit deployment
    $: {
        if (Object.keys($unitToDeploy).length === 0) turnOffCellHighlighting();
    }

    const turnOffCellHighlighting = () => {
        for (let row of grid) {
            for (let cell of row) {
                cell.isDeployable = false;
                cell.highlightAttackRange = false;
            }
        }
        shouldHighlightMeleeCells.set(false);
        shouldHighlightRangedCells.set(false);
        attackRangeCenterCoordinates.set({} as ICoordinates);
    };
</script>

<div class="text-center" />
<div class="flex flex-col">
    <div
        class="flex px-10 mb-3 h-52px
    {expeditionLevelStarted ? 'justify-between' : 'justify-center'}"
    >
        {#if !expeditionLevelStarted}
            <button
                class="flex items-center h-12 mb-1 rpgui-button golden"
                type="button"
                on:click={() => {
                    expeditionLevelStarted = true;
                }}
            >
                <p class="p-5">BEGIN</p>
            </button>
        {:else}
            <div class="flex flex-col">
                <p class="my-1">Enemies Remaining: {enemiesRemaining}</p>
                <p>Lives: {$lifeCount}</p>
            </div>
            <button
                class="flex items-center h-12 rpgui-button golden"
                type="button"
                on:click={handleDefeat}
            >
                <p class="p-4">RETREAT</p>
            </button>
        {/if}
    </div>
    <div class="mx-auto border-4 border-black w-656px h-512px">
        <div class="relative flex flex-row flex-wrap w-648px h-504px">
            {#each grid as row, y}
                {#each row as cell, x}
                    <ExpeditionCell
                        handleCellClick={() => {
                            handleCellClick(cell);
                        }}
                        row={y}
                        col={x}
                        {cell}
                    />
                {/each}
            {/each}
            {#each playerUnits as sprite}
                <Sprite {sprite} />
            {/each}
            {#each enemyUnits as sprite}
                <Sprite {sprite} />
            {/each}
            {#each projectiles as projectile}
                <Projectile
                    spriteSheet={projectile.spriteSheet}
                    positionSpring={projectile.positionSpring}
                    positionXTweened={projectile.positionXTweened}
                    positionYTweened={projectile.positionYTweened}
                    homing={projectile.homing}
                />
            {/each}
        </div>
    </div>
</div>

<style>
    .w-656px {
        width: 656px;
    }
    .h-512px {
        height: 512px;
    }
    .w-648px {
        width: 650px;
    }
    .h-504px {
        height: 504px;
    }
    .p-5 {
        padding: 20px;
    }
    .h-52px {
        height: 52px;
    }
    .mb-3 {
        margin-bottom: 0.75rem;
    }
</style>
