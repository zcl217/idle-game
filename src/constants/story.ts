import { displayDialogueBox, updateDialogue } from "../store/dialogue";
import { curStoryProgress } from "../store/gameState";
import type { IDialogueList } from "~/interfaces/dialogue"
import { get } from "svelte/store";

/*
    Act - Scene
    Ex.
    A1S1 = Act 1 Scene 1
*/

let index = 0;
export const STORY_PROGRESS_LIST: Record<string, number> = {
    A1S1: index++,
    A1S2: index++,
    A1S3: index++,
    A1S4: index++,
    A1S5: index++,
    A2S1: index++,
    A2S2: index++,
    A2S3: index++,
    A2S4: index++,
    A2S5: index++,
    A2S6: index++,
    A2S7: index++,
    A2S8: index++,
    A2S9: index++,
    A2S10: index++,
    A2S11: index++,
    A2S12: index++,
}

console.log(STORY_PROGRESS_LIST);


export const DIALOGUES: IDialogueList = {
    [STORY_PROGRESS_LIST['A1S1']]: {
        characterImage: '../sprites/sage.png',
        characterName: 'Mysterious Mage',
        mainText: `Hey, nice place you got there. As you can tell from my fashionable look, I have quite the eye for aesthetics. And so, I was wondering if I could take that home and this piece of land off your hands. Not for free of course! I happen to be quite an influential and powerful magician, so I can turn you into a rich, powerful lord with immense authority!`,
        yesText: 'Sounds good!',
        noText: 'No thanks',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A1S4'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        },
        noHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A1S2'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        }
    },
    [STORY_PROGRESS_LIST['A1S2']]: {
        characterImage: '../sprites/sage.png',
        characterName: 'Mysterious Mage',
        mainText: `Understood. I'll be around if you ever change your mind. Just build another house for me and I'll come right away! And before you ask, yes, I'll be taking that newly built house too.`,
        yesText: 'Uhh.. okay.',
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A1S3'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
            displayDialogueBox.set(false);
        },
        noHandler: () => { }
    },
    [STORY_PROGRESS_LIST['A1S3']]: {
        characterImage: '../sprites/sage.png',
        characterName: 'Mysterious Mage',
        mainText: `Ah, have you changed your mind?`,
        yesText: 'Yes, I want power!',
        noText: 'No! Go away',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A1S4'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        },
        noHandler: () => {
            displayDialogueBox.set(false);
        }
    },
    [STORY_PROGRESS_LIST['A1S4']]: {
        characterImage: '../sprites/sage.png',
        characterName: 'Mysterious Mage',
        mainText: `A wise decision indeed. A life of glory and riches await you! Since my kindness knows no bounds, I'll even let you decide what kind of lord you want to become. Oh, by the way, once you decide, <span class="text-red-600" style="font-family: inherit">you cannot change your mind</span>. Enjoy! Oh, take this book, it'll come in handy later.`,
        yesText: 'Continue',
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A1S5'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
            displayDialogueBox.set(false);
        },
        noHandler: () => { }
    },
    [STORY_PROGRESS_LIST['A2S1']]: {
        characterImage: '../sprites/peasant.png',
        characterName: '',
        mainText: `Your surroundings start to rapidly spin around you, and after a brief moment, it feels like you've been teleported to an extremely far place.`,
        yesText: 'Continue',
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S2'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        },
        noHandler: () => { }
    },
    [STORY_PROGRESS_LIST['A2S2']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: '?',
        mainText: `Awesome! You actually came! As expected from high mage Aedus, his teleportation magic is second to none.`,
        yesText: '...who are you?',
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S3'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        },
        noHandler: () => { }
    },
    [STORY_PROGRESS_LIST['A2S3']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: '?',
        mainText: `Oh, I guess he hasn't explained anything to you yet. I'm Lieutenant General Xinef. The king suddenly ordered us to launch an all out offensive against the demons in the barren lands to 'bring peace', so the armies are all preparing for war.`,
        yesText: 'Continue',
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S4'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        },
        noHandler: () => { }
    },
    [STORY_PROGRESS_LIST['A2S4']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: 'Xinef',
        mainText: `And so, high mage Aedus, one of the seven legendary heroes, told me that he would summon a champion unrivaled in power and intellect to assist in our conquest. To be honest, the demons are so powerful that I'm not even sure why we're attacking them head on, but your presence brings me great comfort. (Not sure what's with the dirty peasant clothes though...)`,
        yesText: 'Explain the situation',
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S5'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        },
        noHandler: () => { }
    },
    [STORY_PROGRESS_LIST['A2S5']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: 'Xinef',
        mainText: `...`,
        yesText: `.....`,
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S6'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        },
        noHandler: () => { }
    },
    [STORY_PROGRESS_LIST['A2S6']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: 'Xinef',
        mainText: `(...Should I just take my men and run away? Sigh, if only I could.) Hmm.. oh? That book you're holding... I'm pretty sure high mage Aedus was always carrying that around with him!!! Maybe there's hope after all! Try giving it a read! `,
        yesText: 'Read the book',
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S7'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        },
        noHandler: () => { }
    },
    [STORY_PROGRESS_LIST['A2S7']]: {
        characterImage: '../sprites/peasant.png',
        characterName: '',
        mainText: `*You pull out the dusty book that seems so old that it'll disintegrate if a mosquito sneezes on it. You open the book and, before you're even able to read a single word, vast knowledge flows into your mind as the book magically disappears. You feel as if you can build an entire kingdom from scratch now. A familiar voice also appears in your mind...*`,
        yesText: 'Continue',
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S8'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        },
        noHandler: () => { }
    },
    [STORY_PROGRESS_LIST['A2S8']]: {
        characterImage: '../sprites/sage.png',
        characterName: 'Aedus',
        mainText: `Greetings, champion! I know what you're about to say, but I never explicitly said *when* you'd become a lord right? And isn't it more fun to earn it through your own hard work? (just kidding lol, I'm not bothering with those demons. Good thing I was able to grab some random guy before I wasted too much of my ti- oh shoot, doesn't this thing record my thoughts too...?) Erm. At least the book I gave you was useful...? *clears throat* Good luck out there, champion!`,
        yesText: 'Seriously?',
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S9'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        },
        noHandler: () => {}
    },
    [STORY_PROGRESS_LIST['A2S9']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: 'Xinef',
        mainText: `Seeing how you went into a daze after that book disappeared, I take it you learned something useful? Please tell me you did.`,
        yesText: 'Tell him what happened',
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S10'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        },
        noHandler: () => {
        }
    },
    [STORY_PROGRESS_LIST['A2S10']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: 'Xinef',
        mainText: `... I see. Don't worry, I feel like beating up that old man, I mean, I feel like giving high mage Aedus a *serious talk* just as much as you. Oh well, nothing we can do about it. And I'm quite interested in your newfound knowledge capable of building 'an entire kingdom from scratch'. There's still a while before we launch our offensive, so why don't you try building something? Maybe it'll come in handy in the war effort. `,
        yesText: 'Alright',
        noText: `No, I'm leaving`,
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S12'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
            displayDialogueBox.set(false);
        },
        noHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S11'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
        }
    },
    [STORY_PROGRESS_LIST['A2S11']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: 'Xinef',
        mainText: `You might've misunderstood. That was a command phrased as a request out of politeness. Even though you're a lowly peasant, you acquired some of high mage Aedus' knowledge, so you better put that to use for the kingdom before I lose my patience.`,
        yesText: 'Sigh, fine',
        noText: '',
        yesHandler: () => {
            const nextScene = STORY_PROGRESS_LIST['A2S12'];
            curStoryProgress.set(nextScene);
            updateDialogue(DIALOGUES[nextScene]);
            displayDialogueBox.set(false);
        },
        noHandler: () => {
        }
    }
}

/*

    [STORY_PROGRESS_LIST['A2S1']]: {
        characterImage: '',
        characterName: '',
        mainText: `Your surroundings start to rapidly spin around you, and after a brief moment, it feels like you've been teleported to an extremely far place.`,
        yesText: 'Continue',
        noText: '',
        yesHandler: () => {
            curStoryProgress.set(STORY_PROGRESS_LIST['A2S2']);
            const curAct = get(curStoryProgress);
            updateDialogue(DIALOGUES[curAct]);
        },
        noHandler: () => {}
    },
    [STORY_PROGRESS_LIST['A2S2']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: '?',
        mainText: `Ah, you're finally here. I guess that so called aesthetically pleasing gem was worth it after all.`,
        yesText: '...who are you?',
        noText: '',
        yesHandler: () => {
            curStoryProgress.set(STORY_PROGRESS_LIST['2-3']);
            const curAct = get(curStoryProgress);
            updateDialogue(DIALOGUES[curAct]);
        },
        noHandler: () => {}
    },
    [STORY_PROGRESS_LIST['A2S3']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: '?',
        mainText: `Oh, I guess he hasn't explained anything to you yet. My name is *unintelligible noises*, but you can just call me Xinef. I am the first prince of the royal family, but fled my home because my father was corrupted by a powerful demon.`,
        yesText: 'Continue',
        noText: '',
        yesHandler: () => {
            curStoryProgress.set(STORY_PROGRESS_LIST['A2S4']);
            const curAct = get(curStoryProgress);
            updateDialogue(DIALOGUES[curAct]);
        },
        noHandler: () => {}
    },
    [STORY_PROGRESS_LIST['A2S4']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: 'Xinef',
        mainText: `And so, the great mage Krathos, one of the seven legendary heroes, told me that he would summon a knight of unrivaled power to help me free my people and take back my homeland... Your clothes are quite interesting for an almighty knight though.`,
        yesText: 'Explain the situation to him',
        noText: '',
        yesHandler: () => {
            curStoryProgress.set(STORY_PROGRESS_LIST['A2S5']);
            const curAct = get(curStoryProgress);
            updateDialogue(DIALOGUES[curAct]);
        },
        noHandler: () => {}
    },
    [STORY_PROGRESS_LIST['A2S5']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: 'Xinef',
        mainText: `... Sigh, just like I lost my 'aesthetically pleasing' family heirloom, it seems you were also swindled by the so called 'legendary hero'. Usually I'd jump, stomp, and scream, but time is seriously limited here. Can you please tell me he at least left you with something? Anything?`,
        yesText: `Well there's this one book I have...`,
        noText: '',
        yesHandler: () => {
            curStoryProgress.set(STORY_PROGRESS_LIST['A2S6']);
            const curAct = get(curStoryProgress);
            updateDialogue(DIALOGUES[curAct]);
        },
        noHandler: () => {}
    },
    [STORY_PROGRESS_LIST['A2S6']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: 'Xinef',
        mainText: `Great!! Well hurry up and read it! ... Sorry, I've been waiting here for a few months already so I'm a bit impatient. Forgive me.`,
        yesText: 'Read the book',
        noText: '',
        yesHandler: () => {
            curStoryProgress.set(STORY_PROGRESS_LIST['A2S7']);
            const curAct = get(curStoryProgress);
            updateDialogue(DIALOGUES[curAct]);
        },
        noHandler: () => {}
    },
    [STORY_PROGRESS_LIST['A2S7']]: {
        characterImage: '',
        characterName: '',
        mainText: `You pull out the dusty book that seems so old that it'll disintegrate if a mosquito sneezes on it. Immense knowledge flows into your mind. You feel as if you can build an entire kingdom from scratch now. A familiar voice also appears in your mind: <span class="text-white"> *Ah, I assume you're aware of the situation now. I know what you're about to say, but I never explicitly said *when* you'd become a lord right? And isn't it more fun to earn it through your own hard work? Hahaha! </span>`,
        yesText: 'Continue',
        noText: '',
        yesHandler: () => {
            curStoryProgress.set(STORY_PROGRESS_LIST['A2S8']);
            const curAct = get(curStoryProgress);
            updateDialogue(DIALOGUES[curAct]);
        },
        noHandler: () => {}
    },
    [STORY_PROGRESS_LIST['A2S8']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: 'Xinef',
        mainText: `... I see. Don't worry, I feel like beating up that old man just as much as you do. But immense knowledge you say...? Hmm, who knows, maybe you actually can become the lord of destruction. But enough talk, shall we get started with things? More and more of my people should assemble to our cause if we build up a new kingdom.`,
        yesText: 'Okay',
        noText: `No, I'm leaving`,
        yesHandler: () => {
            curStoryProgress.set(STORY_PROGRESS_LIST['A2S10']);
            const curAct = get(curStoryProgress);
            updateDialogue(DIALOGUES[curAct]);
            displayDialogueBox.set(false);
        },
        noHandler: () => {
            curStoryProgress.set(STORY_PROGRESS_LIST['A2S9']);
            const curAct = get(curStoryProgress);
            updateDialogue(DIALOGUES[curAct]);
        }
    },
    [STORY_PROGRESS_LIST['A2S9']]: {
        characterImage: '../sprites/grand-knight.png',
        characterName: 'Xinef',
        mainText: `You might've misunderstood. That was a rhetorical question. You're helping me whether you like it or not. Also, you'd die to some random beast out here in this wilderness without my help anyway. There isn't a single human in this entire continent.`,
        yesText: 'Sigh, fine',
        noText: '',
        yesHandler: () => {
            curStoryProgress.set(STORY_PROGRESS_LIST['A2S10']);
            const curAct = get(curStoryProgress);
            updateDialogue(DIALOGUES[curAct]);
            displayDialogueBox.set(false);
        },
        noHandler: () => {
        }
    }
*/