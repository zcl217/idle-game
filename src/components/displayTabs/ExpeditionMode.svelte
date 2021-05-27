<script lang="ts">
    import { heavyInfantry } from "~/constants/military/units/humans";
    import Sprite from "~/components/military/Sprite.svelte";
    import { tweened } from "svelte/motion";
    import {
        spriteSizes,
        unitStates,
        spriteType,
    } from "~/constants/military/sprites";
    import type { ISprite } from "~/interfaces/military/sprite";
    import { MAP_1, UNIT_PATHS } from "~/constants/military/maps";
    import {
        highlightMeleeCells,
        highlightRangedCells,
        lifeCount,
        unitToDeploy,
    } from "~/store/military";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import type { IMap } from "~/interfaces/military/map";
    import type { IExpeditionCell } from "~/interfaces/military/expeditionGrid";
    import ExpeditionCell from "../military/ExpeditionCell.svelte";
    import { getExpeditionBackgroundPosition } from "~/utils/helpers";
    import {
        setLifeCount,
        handleDamageCalculations,
        handleEnemyMovements,
        handleProjectiles,
        handleUnitAnimations,
        initializeEnemies,
        initializeGrid,
        initializeUnitPosition,
        processDamageCalculation,
        setGridPath,
    } from "~/utils/expeditionMode";
    import type { ICoordinates } from "~/interfaces/common";
    import { spriteSheetMap } from "~/constants/military/spriteSheetMap";
    import { cloneDeep, uniqueId } from "lodash";
    import type { IProjectile } from "~/interfaces/military/projectile";
    import Projectile from "../military/Projectile.svelte";

    export let mapType: number = 1,
        level = 1;

    const dispatch = createEventDispatcher();

    let grid: IExpeditionCell[][] = [];
    let enemyUnits: ISprite[] = [];
    let playerUnits: ISprite[] = [];
    let projectiles: IProjectile[] = [];
    let enemiesRemaining: number = 0;
    let interval = 0;

    onMount(() => {
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

        // IMPORTANT: there's a bug where the deployable (half opacity) image remains
        // on the field if you hover over an area and then an enemy walks into that area
        let delay = 200;
        let frame = 0;
        interval = setInterval(() => {
            frame++;
            handleDamageCalculations(
                grid,
                playerUnits,
                enemyUnits,
                projectiles
            );
            handleProjectiles(projectiles);
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
            enemyUnits = enemyUnits;
            playerUnits = playerUnits;
            grid = grid;
            projectiles = projectiles;
        }, delay);
        setTimeout(() => {
            initializeEnemies(level, enemyUnits, grid);
        }, delay);
    };

    onDestroy(() => {
        clearInterval(interval);
    });

    $: {
        if ($lifeCount === 0) {
            clearInterval(interval);
            //emit to emit defeat to parent
            dispatch("DEFEAT");
        }
    }

    // const sprite1: ISprite = Object.assign({}, heavyInfantry);
    // sprite1.unitPath = UNIT_PATHS.MAP_1.PATH_1;

    // svelte can't react to object property changes, so
    // just make the sprite list a store value
    // ? but i'm doing sprites = sprites right now so I think it's fine
    $: sprites = [
        ,//  sprite1,
        // {
        //     spriteSheet: "~/../sprites/spriteSheets/heavy infantry.png",
        //     positionX: tweened(144, {
        //         duration: 400,
        //     }),
        //     positionY: 144,
        //     spriteSheetPositionX: 0,
        //     spriteSheetPositionY: 0,
        //     damage: 0,
        //     maxHp: 0,
        //     name: "test",
        // },
    ];

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
                    if (!cell.isPath && !cell.playerUnit)
                        cell.isDeployable = true;
                }
            }
        } else if (!$highlightRangedCells && !$highlightMeleeCells) {
            turnOffCellHighlighting();
        }
        grid = grid;
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
            unitToDeploy.set({});
        }
    };

    const turnOffCellHighlighting = () => {
        for (let row of grid) {
            for (let cell of row) {
                cell.isDeployable = false;
            }
        }
        highlightMeleeCells.set(false);
        highlightRangedCells.set(false);
    };

    const handleHomingProjectileCollision = (projectile: IProjectile) => {
        processDamageCalculation(
            projectile.damage,
            projectile.target,
            grid,
            playerUnits,
            enemyUnits
        );
        for (let a = 0; a < projectiles.length; a++) {
            if (projectiles[a].projectileId === projectile.projectileId) {
                projectiles.splice(a, 1);
                break;
            }
        }
        projectiles = projectiles;
    };
</script>

<div class="text-center" />
<div class="flex justify-between px-10 my-3">
    <p>Stage 1-1</p>
    <p>Lives: {$lifeCount}</p>
    <!-- <p> Enemies Remaining: {enemiesRemaining} </p> -->
</div>
<div class="mx-auto border-2 border-black w-648px h-504px">
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
                handleHomingProjectileCollision={() => {
                    handleHomingProjectileCollision(projectile);
                }}
                {projectile}
            />
        {/each}
        <!-- {/key} -->
    </div>
</div>

<style>
    .w-648px {
        width: 650px;
    }

    .h-504px {
        height: 504px;
    }
</style>
