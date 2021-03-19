export const resourceTypes = {
    FOOD: 'food',
    FARMS: 'farms',
    WOOD: 'wood',
    STORAGE: 'storages',
    GOLD: 'gold',
}

export const resourceGeneratorMap = {
    [resourceTypes.FOOD]: resourceTypes.FARMS

}

export const resourceCostMultipliers = {
    [resourceTypes.FARMS]: (val) => {
        return val * 1.1 + 5
    },
    [resourceTypes.STORAGE]: (val) => {
        return val * 1.2 + 30
    }
}