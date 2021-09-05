import { writable } from 'svelte/store';
import { LIBRARY_COLLECTIONS } from '~/constants/library/library';

export const completedCollections = writable(new Set<string>([LIBRARY_COLLECTIONS.TODO]));
export const unlockedLibrary = writable(false);
export const unlockedCollections = writable(new Set<string>(['hufsJournal0']));