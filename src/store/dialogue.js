import { writable } from 'svelte/store';

export const displayDialogueBox = writable(false);
export const characterImage = writable('');
export const characterName = writable('');
export const mainText = writable('');
export const yesText = writable('');
export const noText = writable('');