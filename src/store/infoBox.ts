import { writable } from 'svelte/store';

export const displayInfoBox = writable(false);
export const buttonType = writable('');
export const buttonCategory = writable('');
export const buttonPositionX = writable(0);
export const buttonPositionY = writable(0);