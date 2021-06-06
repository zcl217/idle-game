export interface IResource {
    value: number;
    generationValue?: number;
    limit: number;
    displayGenerationRate: boolean;
}

export interface IResourceList {
    [key: string]: IResource;
}

