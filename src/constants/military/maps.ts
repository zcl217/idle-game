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
    ],
    undeployable: [],
}

export const MAP_2: IMap = {
    start: [
        { row: 1, col: 0 },
        { row: 4, col: 0 },
        { row: 6, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 3 },
        { row: 0, col: 5 },
    ],
    end: [
        { row: 6, col: 7 },
        { row: 6, col: 8 }
    ],
    path: [
        { row: 1, col: 0 },
        { row: 4, col: 0 },
        { row: 6, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 3 },
        { row: 0, col: 5 },
        { row: 6, col: 7 },
        { row: 6, col: 8 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 1, col: 4 },
        { row: 1, col: 5 },
        { row: 1, col: 6 },
        { row: 1, col: 7 },
        { row: 1, col: 7 },
        { row: 2, col: 7 },
        { row: 3, col: 7 },
        { row: 4, col: 7 },
        { row: 5, col: 7 },
        { row: 1, col: 8 },
        { row: 2, col: 8 },
        { row: 3, col: 8 },
        { row: 4, col: 8 },
        { row: 5, col: 8 },
        { row: 4, col: 1 },
        { row: 4, col: 2 },
        { row: 4, col: 3 },
        { row: 4, col: 4 },
        { row: 4, col: 5 },
        { row: 3, col: 5 },
        { row: 2, col: 5 },
        { row: 4, col: 5 },
        { row: 5, col: 2 },
        { row: 6, col: 1 },
        { row: 6, col: 2 },
        { row: 6, col: 3 },
        { row: 6, col: 4 },
        { row: 6, col: 5 },
        { row: 6, col: 6 },
        { row: 5, col: 6 },
    ],
    undeployable: [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 2, col: 4 },
        { row: 3, col: 0 },
        { row: 3, col: 1 },
        { row: 3, col: 2 },
        { row: 3, col: 4 },
        { row: 5, col: 0 },
        { row: 5, col: 1 },
        { row: 0, col: 6 },
        { row: 0, col: 7 },
        { row: 0, col: 8 },
    ],
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
            { row: 5, col: 7 },
            { row: 4, col: 7 },
            { row: 3, col: 7 },
            { row: 2, col: 7 },
            { row: 1, col: 7 },
            { row: 0, col: 7 },
        ],
    },
    MAP_2: {
        // from top left, straight right then down
        PATH_1: [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 1, col: 3 },
            { row: 1, col: 4 },
            { row: 1, col: 5 },
            { row: 1, col: 6 },
            { row: 1, col: 7 },
            // going down
            { row: 2, col: 7 },
            { row: 3, col: 7 },
            { row: 4, col: 7 },
            { row: 5, col: 7 },
            { row: 6, col: 7 },
        ],
        // from top left, going down then right, first end
        PATH_2: [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 1, col: 3 },
            { row: 1, col: 4 },
            { row: 1, col: 5 },
            { row: 2, col: 5 },
            { row: 3, col: 5 },
            { row: 4, col: 5 },
            // going left
            { row: 4, col: 4 },
            { row: 4, col: 3 },
            { row: 4, col: 2 },
            { row: 5, col: 2 },
            { row: 6, col: 2 },
            // going right
            { row: 6, col: 3 },
            { row: 6, col: 4 },
            { row: 6, col: 5 },
            { row: 6, col: 6 },
            { row: 5, col: 6 },
            { row: 5, col: 7 },
            { row: 6, col: 7 },
        ],
        // from top 1, going down then right, first end
        PATH_3: [
            { row: 0, col: 1 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 1, col: 3 },
            { row: 1, col: 4 },
            { row: 1, col: 5 },
            { row: 2, col: 5 },
            { row: 3, col: 5 },
            { row: 4, col: 5 },
            // going left
            { row: 4, col: 4 },
            { row: 4, col: 3 },
            { row: 4, col: 2 },
            { row: 5, col: 2 },
            { row: 6, col: 2 },
            // going right
            { row: 6, col: 3 },
            { row: 6, col: 4 },
            { row: 6, col: 5 },
            { row: 6, col: 6 },
            { row: 5, col: 6 },
            { row: 5, col: 7 },
            { row: 6, col: 7 },
        ],
        // from top 2, going down then right, second end
        PATH_4: [
            { row: 0, col: 3 },
            { row: 1, col: 3 },
            { row: 1, col: 4 },
            { row: 1, col: 5 },
            { row: 2, col: 5 },
            { row: 3, col: 5 },
            { row: 4, col: 5 },
            // going left
            { row: 4, col: 4 },
            { row: 4, col: 3 },
            { row: 4, col: 2 },
            { row: 5, col: 2 },
            { row: 6, col: 2 },
            // going right
            { row: 6, col: 3 },
            { row: 6, col: 4 },
            { row: 6, col: 5 },
            { row: 6, col: 6 },
            { row: 5, col: 6 },
            { row: 5, col: 7 },
            { row: 5, col: 8 },
            { row: 6, col: 8 },
        ],
        // from top 3, going down then right, first end
        PATH_5: [
            { row: 0, col: 5 },
            { row: 1, col: 5 },
            { row: 2, col: 5 },
            { row: 3, col: 5 },
            { row: 4, col: 5 },
            // going left
            { row: 4, col: 4 },
            { row: 4, col: 3 },
            { row: 4, col: 2 },
            { row: 5, col: 2 },
            { row: 6, col: 2 },
            // going right
            { row: 6, col: 3 },
            { row: 6, col: 4 },
            { row: 6, col: 5 },
            { row: 6, col: 6 },
            { row: 5, col: 6 },
            { row: 5, col: 7 },
            { row: 6, col: 7 },
        ],
        // from bottom left 1, going right, up, right, down
        PATH_6: [
            { row: 4, col: 0 },
            { row: 4, col: 1 },
            { row: 4, col: 2 },
            { row: 4, col: 3 },
            { row: 4, col: 4 },
            { row: 4, col: 5 },
            { row: 3, col: 5 },
            { row: 2, col: 5 },
            { row: 1, col: 5 },
            { row: 1, col: 6 },
            { row: 1, col: 7 },
            { row: 1, col: 8 },
            // reached right
            { row: 2, col: 8 },
            { row: 3, col: 8 },
            { row: 4, col: 8 },
            { row: 5, col: 8 },
            { row: 6, col: 8 },
        ],
        // from bottom left 2, going right, up, right, down
        PATH_7: [
            { row: 6, col: 0 },
            { row: 6, col: 1 },
            { row: 6, col: 2 },
            { row: 5, col: 2 },
            { row: 4, col: 2 },
            { row: 4, col: 3 },
            { row: 4, col: 4 },
            { row: 4, col: 5 },
            { row: 3, col: 5 },
            { row: 2, col: 5 },
            { row: 1, col: 5 },
            { row: 1, col: 6 },
            { row: 1, col: 7 },
            // reached right
            { row: 2, col: 7 },
            { row: 3, col: 7 },
            { row: 4, col: 7 },
            { row: 5, col: 7 },
            { row: 6, col: 7 },
        ], 
        // from unwalkable left to right, then down
        PATH_8: [
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 2, col: 3 },
            { row: 2, col: 4 },
            { row: 2, col: 5 },
            { row: 2, col: 6 },
            { row: 2, col: 7 },
            // reached right
            { row: 2, col: 8 },
            { row: 3, col: 8 },
            { row: 4, col: 8 },
            { row: 5, col: 8 },
            { row: 6, col: 8 },
        ],
    }
}