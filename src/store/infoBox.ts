import { writable } from 'svelte/store';

export const buttonCategory = writable('');
export const buttonType = writable('');
export const buttonPositionX = writable(0);
export const buttonPositionY = writable(0);
export const displayInfoBox = writable(false);
export const displayResourceInfoBox = writable(false);
export const resourceName = writable('');
export const resourceProfitsAndLosses = writable({} as Record<string, number>);
export const rowPositionX = writable(0);
export const rowPositionY = writable(0);