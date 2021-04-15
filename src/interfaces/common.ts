export interface IPrereqs {
    sciencePrereqs: string[]
    resourcePrereqs: string[]
}

export interface IPrereqsList {
    [key: string]: IPrereqs
}