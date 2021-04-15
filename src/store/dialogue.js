import { writable } from 'svelte/store';

export const displayDialogueBox = writable(false);
export const characterImage = writable('');
export const characterName = writable('');
export const mainText = writable('');
export const yesText = writable('');
export const noText = writable('');
export const yesHandler = writable(()=>{})
export const noHandler = writable(()=>{})

export const updateDialogue = (newDialogue) => {
    if (!newDialogue) return;
    characterImage.set(newDialogue.characterImage);
    characterName.set(newDialogue.characterName);
    mainText.set(newDialogue.mainText);
    yesText.set(newDialogue.yesText);
    noText.set(newDialogue.noText);
    yesHandler.set(newDialogue.yesHandler);
    noHandler.set(newDialogue.noHandler);
}