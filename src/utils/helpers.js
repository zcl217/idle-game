// displays m if over a million
// displays k if over a thousand
// parses numbers to two decimal places
import { resourceGeneratorMap } from '../constants/resourceTypes';

export const resourceParser = (input) => {
    const value = Math.round(input * 100) / 100;
    const million = 1000000;
    const thousand = 1000;
    let parsedValue = '';
    if (value >= million) {
        parsedValue += value % million;
        parsedValue += 'm';
    } else if (value >= thousand) {
        parsedValue += value % thousand;
        parsedValue += 'k';
    } else {
        return value;
    }
    return parsedValue;
}

export const calculateGenerationRate = (type, resources) => {
    if (!resources) return 0;
    const generator = resourceGeneratorMap[type];
    const resourcesGenerated = resources[generator]?.generationValue ?? 0;
    return resourceParser(resourcesGenerated);
}