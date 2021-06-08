<script lang="ts">
    import Sprite from "~/components/military/Sprite.svelte";
    import type { ISprite } from "~/interfaces/military/sprite";
    import {
        highlightAttackRange,
        highlightMeleeCells,
        highlightRangedCells,
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

    onMount(() => {
        //  handleVictory();
        grid = initializeGrid(mapType);
        setGridPath(grid, mapType);
        setLifeCount(level, lifeCount);
        setTimeout(() => {
            startExpeditionLevel();
        }, 0);
    });

    const startExpeditionLevel = () => {
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
            //enemyUnits = enemyUnits;
            playerUnits = playerUnits;
            grid = grid;
            projectiles = projectiles;
        }, delay);
        setTimeout(() => {
            enemiesRemaining = initializeEnemies(stage, enemyUnits, grid);
        }, delay);
    };

    onDestroy(() => {
        clearInterval(interval);
    });

    $: {
        if ($lifeCount <= 0) {
            setTimeout(() => {
                handleDefeat();
                removedEnemyUnitCount.reset();
                enemiesRemaining = 1;
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
    };

    const handleDefeat = () => {
        clearInterval(interval);
        // set it to 1 so we don't instantly lose when we load this component
        // (since we lose when lives are 0)
        lifeCount.set(1);
        //emit to emit defeat to parent
        dispatch("DEFEAT");
    };

    $: {
        // console.log("hightlight melee cells");
        if ($highlightMeleeCells) {
            for (let row of grid) {
                for (let cell of row) {
                    if (meleeCellIsDeployable(cell)) {
                        cell.isDeployable = true;
                    } else {
                        cell.isDeployable = false;
                    }
                }
            }
        } else if (!$highlightRangedCells && !$highlightMeleeCells) {
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
        if ($highlightRangedCells) {
            for (let row of grid) {
                for (let cell of row) {
                    if (!cell.isPath && !cell.playerUnit && !cell.undeployableTerrain) {
                        cell.isDeployable = true;
                    } else {
                        cell.isDeployable = false;
                    }
                }
            }
        } else if (!$highlightRangedCells && !$highlightMeleeCells) {
            turnOffCellHighlighting();
        }
        grid = grid;
    }

    $: {
        if ($highlightRangedCells) {
            for (let row of grid) {
                for (let cell of row) {
                    cell.highlightAttackRange = undefined;
                }
            }
            const coordinates = $highlightAttackRange;
            let curRow = coordinates.row;
            let curCol = coordinates.col;
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
        }
    }

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

    const turnOffCellHighlighting = () => {
        for (let row of grid) {
            for (let cell of row) {
                cell.isDeployable = false;
                cell.highlightAttackRange = false;
            }
        }
        highlightMeleeCells.set(false);
        highlightRangedCells.set(false);
        highlightAttackRange.set({} as ICoordinates);
    };
</script>

<div class="text-center" />
<div class="flex justify-between px-10 mb-3">
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
</div>
<div class="mx-auto border-4 border-black w-656px h-512px">
    <div class="relative flex flex-row flex-wrap w-648px h-504px">
        <!--    {#key $highlightMeleeCells} -->
        <!--   {#key test} -->
        {#each grid as row, y}
            {#each row as cell, x}
                <!-- this is where we look at the properties of the cell
                to determine how to style it. 
                i think we also need a bunch of handlers to handle 
                events like mouse hover/unit placement/placed unit etc
            -->
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
        <!-- {/key} -->
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
</style>
