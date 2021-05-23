export interface IPrereqs {
    sciencePrereqs: string[];
    resourcePrereqs: string[];
}

export interface IPrereqsList {
    [key: string]: IPrereqs;
}

export interface ICoordinates {
    row: number;
    col: number;
}