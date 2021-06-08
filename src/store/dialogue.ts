import { writable } from 'svelte/store';
import type { IDialogue } from '~/interfaces/dialogue';

export const displayDialogueBox = writable(false);
export const characterImage = writable('');
export const characterName = writable('');
export const mainText = writable('');
export const yesText = writable('');
export const noText = writable('');
export const yesHandler = writable(new Function)
export const noHandler = writable(new Function)

export const updateDialogue = (newDialogue: IDialogue): void => {
    if (!newDialogue) return;
    characterImage.set(newDialogue.characterImage);
    characterName.set(newDialogue.characterName);
    mainText.set(newDialogue.mainText);
    yesText.set(newDialogue.yesText);
    noText.set(newDialogue.noText);
    yesHandler.set(newDialogue.yesHandler);
    noHandler.set(newDialogue.noHandler);
}