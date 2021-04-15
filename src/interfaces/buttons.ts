export interface IButtonCost {
    type: string;
    text: string;
    cost: number;
}

export interface IButtonCostList {
    [key: string]: IButtonCost[];
}