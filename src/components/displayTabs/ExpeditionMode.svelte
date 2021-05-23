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
        unitToDeploy,
    } from "~/store/military";
    import { onDestroy, onMount } from "svelte";
    import type { IMap } from "~/interfaces/military/map";
    import type { IExpeditionCell } from "~/interfaces/military/expeditionGrid";
    import ExpeditionCell from "../military/ExpeditionCell.svelte";
    import { getBackgroundPosition } from "~/utils/helpers";
    import {
        getLifeCount,
        handleDamageCalculations,
        handleEnemyMovements,
        handleProjectileAnimations,
        handleUnitAnimations,
        initializeEnemies,
        initializeGrid,
        initializeUnitPosition,
        setGridPath,
    } from "~/utils/expeditionMode";
    import type { ICoordinates } from "~/interfaces/common";
    import { spriteSheetMap } from "~/constants/military/spriteSheetMap";
    import { cloneDeep, uniqueId } from "lodash";

    export let mapType: number = 1,
        level = 1;

    let grid: IExpeditionCell[][] = [];
    let enemyUnits: ISprite[] = [];
    let playerUnits: ISprite[] = [];
    let lifeCount: number = 0;
    let interval = 0;

    onMount(() => {
        grid = initializeGrid(mapType);
        setGridPath(grid, mapType);
        lifeCount = getLifeCount(level);
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
        let delay = 500;
        let frame = 0;
        interval = setInterval(() => {
            frame++;
            handleDamageCalculations(grid, playerUnits, enemyUnits);
            /*
             if we want to implement faster/slower movements,
             we need the setinterval to be at the lowest tick (the fastest moving unit
             speed's interval) and then just ignore the mobs that are still moving 
             (which can be done by checking their state)
            */
            handleEnemyMovements(enemyUnits, grid);
            handleUnitAnimations(playerUnits, enemyUnits, frame);
            handleProjectileAnimations();
            // when all enemies are dead, emit event to parent that stage is over
            // OR if you run out of lives,
            if (frame > 60) frame = 0;
            enemyUnits = enemyUnits;
            playerUnits = playerUnits;
            grid = grid;
        }, delay);
        setTimeout(() => {
            initializeEnemies(level, enemyUnits, grid);
        }, delay);
    };

    onDestroy(() => {
        clearInterval(interval);
    });

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
                    if (
                        cell.isPath &&
                        !cell.playerUnit &&
                        !cell.startOfPath &&
                        !cell.endOfPath &&
                        !cell.enemyUnitArriving &&
                        cell.enemyUnitList.length === 0
                    ) {
                        cell.isDeployable = true;
                    } else {
                        cell.isDeployable = false;
                    }
                }
            }
        }
        grid = grid;
    }

    $: {
        if ($highlightRangedCells) {
            for (let row of grid) {
                for (let cell of row) {
                    if (!cell.isPath && !cell.playerUnit)
                        cell.isDeployable = true;
                }
            }
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
            console.log(newPlayerUnit);
            newPlayerUnit.spriteInfo.unitId = uniqueId();
            initializeUnitPosition(
                newPlayerUnit,
                cell.coordinates.row,
                cell.coordinates.col
            );
            playerUnits.push(newPlayerUnit);
            console.log(cell);
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

    let test = 0;
    setInterval(() => {
        return;
        if (test < 5)
            for (let sprite of sprites)
                sprite.state.currentState = unitStates.ATTACK;

        if (unitStates.IDLE === sprites[0].state.currentState) {
            if (test % 7 === 0) {
                for (let sprite of sprites) {
                    sprite.state.currentState = unitStates.ATTACK;
                    handleSpriteAnimations(sprite);
                }
            }
        } else {
            for (let sprite of sprites) {
                handleSpriteAnimations(sprite);
            }
        }

        // test 2
        // if (test < 5)  sprites[0]state.currentState = unitStates.ATTACK;

        // if (unitStates.IDLE === sprites[0]state.currentState) {
        //     if (test % 7 === 0) {
        //         sprites[0]state.currentState = unitStates.ATTACK;
        //         handleSprite(sprites[0]);
        //     }
        // } else {

        // handleSprite(sprites[0])
        // }

        // test 1
        //  handleSprite(sprites[0]);
        test++;
        // svelte only reacts to assignments so we need this to trigger reactivity
        sprites = sprites;
    }, 100);

    const handleSpriteAnimations = (sprite: any) => {
        let frameList = [];
        switch (sprite.state.currentState) {
            case unitStates.IDLE:
                frameList = sprite.idleFrames;
                break;
            case unitStates.ATTACK:
                frameList = sprite.attackFrames;
                break;
            case unitStates.MOVE:
                frameList = sprite.moveFrames;
                break;
            default:
                break;
        }
        if (sprite.state.currentFrame >= frameList.length) {
            sprite.state.currentState = unitStates.IDLE;
            sprite.state.currentFrame = 0;
            frameList = sprite.idleFrames;
        }
        const spriteSheetPosition = frameList[sprite.state.currentFrame];
        // console.log(spriteSheetPosition)
        sprite.spriteSheetPositionX =
            spriteSheetPosition.col * -sprite.spriteInfo.spriteSize.x;
        sprite.spriteSheetPositionY =
            spriteSheetPosition.row * -sprite.spriteInfo.spriteSize.y;
        /// console.log(sprite.spriteSheetPositionX + " " + sprite.spriteSheetPositionY);
        sprite.state.currentFrame++;
        // console.log("frame: " + sprite.state.currentFrame + " state: " + sprite.state.currentState)
    };

    /*
    const getSpriteStyles = (sprite: any) => {
        const style = `
            background-image: url('${sprite.spriteSheet}');
            left: ${$tweenTest}px;
            top: ${sprite.positionY}px;
            width: ${sprite.spriteInfo.spriteSize.x}px;
            height: ${sprite.spriteInfo.spriteSize.y}px;
            background-position: ${getBackgroundPosition(sprite)}
        `;
        return style;
    };
    */
</script>

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
