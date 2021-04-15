export interface IResource {
    value: number;
    generationValue?: number;
    limit: number;
}

export interface IResourceList {
    [key: string]: IResource;
}

