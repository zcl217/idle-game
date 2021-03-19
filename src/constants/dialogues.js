import { displayDialogueBox } from "../store/dialogue.js";

/*
    A = Act
    S = Scene
    .

    Ex.
    A1S1 = Act 1 Scene 1
*/
const dialogues = {
    'A1S1': {
        characterImage: '../sprites/footpad.png',
        characterName: '',
        mainText: 'Hey, nice place you got there.',
        yesText: 'Sounds good!',
        noText: 'No thanks',
        yesHandler: () => {

        },
        noHandler: () => {
            console.log("set false")
            displayDialogueBox.set(false);
        }
    }
}

export default dialogues;