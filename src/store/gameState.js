import { writable, get } from 'svelte/store';

export const act = writable('1');
export const scene = writable('1');
export const playerImage = writable('../sprites/peasant.png');
export const playerName = writable('Peasant');

export const getCurScene = () => {
    return `A${get(act)}S${get(scene)}`;
}