import type { ICoordinates } from "~/interfaces/common"
import type { IMap } from "~/interfaces/military/map"

export const CELL_WIDTH = 72;
export const CELL_HEIGHT = 72;

/*
    These constants hold the tile layout and paths of each playable map.
*/

export const MAP_1: IMap = {
    start: [
        { row: 6, col: 1 },
        { row: 6, col: 7 }
    ],
    end: [
        { row: 0, col: 4 },
        { row: 0, col: 7 }
    ],
    path: [
        { row: 0, col: 4 },
        { row: 0, col: 7 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 1, col: 4 },
        { row: 1, col: 7 },
        { row: 2, col: 1 },
        { row: 2, col: 7 },
        { row: 3, col: 1 },
        { row: 3, col: 2 },
        { row: 3, col: 3 },
        { row: 3, col: 4 },
        { row: 3, col: 5 },
        { row: 3, col: 6 },
        { row: 3, col: 7 },
        { row: 4, col: 4 },
        { row: 4, col: 7 },
        { row: 5, col: 1 },
        { row: 5, col: 2 },
        { row: 5, col: 3 },
        { row: 5, col: 4 },
        { row: 5, col: 7 },
        { row: 6, col: 7 },
        { row: 6, col: 1 },
    ]
}

// Possible paths the enemy units can take
export const UNIT_PATHS = {
    MAP_1: {
        // bottom left to top left
        PATH_1: [
            { row: 6, col: 1 },
            { row: 5, col: 1 },
            { row: 5, col: 2 },
            { row: 5, col: 3 },
            { row: 5, col: 4 },
            { row: 4, col: 4 },
            // chokepoint
            { row: 3, col: 4 },
            { row: 3, col: 3 },
            { row: 3, col: 2 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 1, col: 3 },
            { row: 1, col: 4 },
            { row: 0, col: 4 },
        ],
        // bottom right to top left
        PATH_2: [
            { row: 6, col: 7 },
            { row: 5, col: 7 },
            { row: 4, col: 7 },
            { row: 3, col: 7 },
            { row: 3, col: 6 },
            { row: 3, col: 5 },
            // chokepoint
            { row: 3, col: 4 },
            { row: 3, col: 3 },
            { row: 3, col: 2 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 1, col: 3 },
            { row: 1, col: 4 },
            { row: 0, col: 4 },
        ],
        // bottom right to top right
        PATH_3: [
            { row: 6, col: 7 },
            { row: 5, col: 6 },
            { row: 4, col: 6 },
            { row: 3, col: 6 },
            { row: 2, col: 6 },
            { row: 1, col: 6 },
            { row: 0, col: 6 },
        ],
    }
}