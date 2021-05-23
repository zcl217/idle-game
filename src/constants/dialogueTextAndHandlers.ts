import { displayDialogueBox, updateDialogue } from "../store/dialogue.js";
import { act, scene, getCurActScene } from "../store/gameState";
import type { IDialogueList } from "~/interfaces/dialogue"
/*
    A = Act
    S = Scene
    .

    Ex.
    A1S1 = Act 1 Scene 1
*/
const dialogues: IDialogueList = {
    'A1S1': {
        characterImage: '../sprites/sage.png',
        characterName: 'Mysterious Mage',
        mainText: `Hey, nice place you got there. As you can tell from my fashionable look, I have quite the eye for aesthetics. And so, I was wondering if I could take that home and this piece of land off your hands. Not for free of course! I happen to be quite an influential and powerful magician, so I can turn you into a rich, powerful lord with immense authority!`,
        yesText: 'Sounds good!',
        noText: 'No thanks',
        yesHandler: () => {
            scene.set('4');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        },
        noHandler: () => {
            scene.set('2');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        }
    },
    'A1S2': {
        characterImage: '../sprites/sage.png',
        characterName: 'Mysterious Mage',
        mainText: `Understood. I'll be around if you ever change your mind. Just build another house for me and I'll come right away! And before you ask, yes, I'll be taking that newly built house too.`,
        yesText: 'Uhh.. okay.',
        noText: '',
        yesHandler: () => {
            displayDialogueBox.set(false);
            scene.set('3');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        },
        noHandler: () => { }
    },
    'A1S3': {
        characterImage: '../sprites/sage.png',
        characterName: 'Mysterious Mage',
        mainText: `Ah, have you changed your mind?`,
        yesText: 'Yes, I want power!',
        noText: 'No! Go away',
        yesHandler: () => {
            scene.set('4');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        },
        noHandler: () => {
            displayDialogueBox.set(false);
         }
    },
    'A1S4': {
        characterImage: '../sprites/sage.png',
        characterName: 'Mysterious Mage',
        mainText: `A wise decision indeed. A life of glory and riches await you! Since my kindness knows no bounds, I'll even let you decide what kind of lord you want to become. Oh, by the way, once you decide, <span class="text-red-600">you cannot change your mind</span>. Enjoy! Oh, take this book, it'll come in handy later.`,
        yesText: 'Continue',
        noText: '',
        yesHandler: () => {
            //toggle main display
            displayDialogueBox.set(false);
            scene.set('5');
            console.log(getCurActScene())
        },
        noHandler: () => {}
    },
    'A2S1': {
        characterImage: '',
        characterName: '',
        mainText: `Your surroundings start to rapidly spin around you, and after a brief moment, it feels like you've been teleported to an extremely far place.`,
        yesText: 'Continue',
        noText: '',
        yesHandler: () => {
            scene.set('2');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        },
        noHandler: () => {}
    },
    'A2S2': {
        characterImage: '../sprites/destroyers/atokpi samurai.png',
        characterName: '?',
        mainText: `Ah, you're finally here. I guess that so called aesthetically pleasing gem was worth it after all.`,
        yesText: '...who are you?',
        noText: '',
        yesHandler: () => {
            scene.set('3');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        },
        noHandler: () => {}
    },
    'A2S3': {
        characterImage: '../sprites/destroyers/atokpi samurai.png',
        characterName: '?',
        mainText: `Oh, I guess he hasn't explained anything to you yet. My name is *unintelligible noises*, but you can just call me atokpi. I am the first prince of the royal family, but fled my home because my father was corrupted by a powerful demon.`,
        yesText: 'Continue',
        noText: '',
        yesHandler: () => {
            scene.set('4');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        },
        noHandler: () => {}
    },
    'A2S4': {
        characterImage: '../sprites/destroyers/atokpi samurai.png',
        characterName: 'Atokpi',
        mainText: `And so, the great mage Krathos, one of the seven legendary heroes, told me that he would summon a knight of unrivaled power to help me free my people and take back my homeland... Your clothes are quite interesting for an almighty knight though.`,
        yesText: 'Explain the situation to him',
        noText: '',
        yesHandler: () => {
            scene.set('5');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        },
        noHandler: () => {}
    },
    'A2S5': {
        characterImage: '../sprites/destroyers/atokpi samurai.png',
        characterName: 'Atokpi',
        mainText: `... Sigh, just like I lost my 'aesthetically pleasing' family heirloom, it seems you were also swindled by the so called 'legendary hero'. Usually I'd jump, stomp, and scream, but time is seriously limited here. Can you please tell me he at least left you with something? Anything?`,
        yesText: `Well there's this one book I have...`,
        noText: '',
        yesHandler: () => {
            scene.set('6');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        },
        noHandler: () => {}
    },
    'A2S6': {
        characterImage: '../sprites/destroyers/atokpi samurai.png',
        characterName: 'Atokpi',
        mainText: `Great!! Well hurry up and read it! ... Sorry, I've been waiting here for a few months already so I'm a bit impatient. Forgive me.`,
        yesText: 'Read the book',
        noText: '',
        yesHandler: () => {
            scene.set('7');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        },
        noHandler: () => {}
    },
    'A2S7': {
        characterImage: '',
        characterName: '',
        mainText: `You pull out the dusty book that seems so old that it'll disintegrate if a mosquito sneezes on it. Immense knowledge flows into your mind. You feel as if you can build an entire kingdom from scratch now. A familiar voice also appears in your mind: <span class="text-white"> *Ah, I assume you're aware of the situation now. I know what you're about to say, but I never explicitly said *when* you'd become a lord right? And isn't it more fun to earn it through your own hard work? Hahaha! </span>`,
        yesText: 'Continue',
        noText: '',
        yesHandler: () => {
            scene.set('8');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        },
        noHandler: () => {}
    },
    'A2S8': {
        characterImage: '../sprites/destroyers/atokpi samurai.png',
        characterName: 'Atokpi',
        mainText: `... I see. Don't worry, I feel like beating up that old man just as much as you do. But immense knowledge you say...? Hmm, who knows, maybe you actually can become the lord of destruction. But enough talk, shall we get started with things? More and more of my people should assemble to our cause if we build up a new kingdom.`,
        yesText: 'Okay',
        noText: `No, I'm leaving`,
        yesHandler: () => {
            scene.set('10');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
            displayDialogueBox.set(false);
        },
        noHandler: () => {
            scene.set('9');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
        }
    },
    'A2S9': {
        characterImage: '../sprites/destroyers/atokpi samurai.png',
        characterName: 'Atokpi',
        mainText: `You might've misunderstood. That was a rhetorical question. You're helping me whether you like it or not. Also, you'd die to some random beast out here in this wilderness without my help anyway. There isn't a single human in this entire continent.`,
        yesText: 'Sigh, fine',
        noText: '',
        yesHandler: () => {
            scene.set('10');
            const curScene = getCurActScene();
            updateDialogue(dialogues[curScene]);
            displayDialogueBox.set(false);
        },
        noHandler: () => {
        }
    }
}

export default dialogues;