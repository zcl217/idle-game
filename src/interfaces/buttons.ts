export interface IButtonCost {
    type: string;
    cost: number;
}

export interface IButtonCostList {
    [key: string]: IButtonCost[];
}