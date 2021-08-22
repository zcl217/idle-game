import { writable } from 'svelte/store';

export const unlockedLibrary = writable(false);
export const unlockedCollections = writable(new Set<string>(['hufsJournal0']));