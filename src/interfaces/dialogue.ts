export interface IDialogue {
    characterImage: string;
    characterName: string;
    mainText: string;
    yesText: string;
    noText: string;
    yesHandler: Function;
    noHandler: Function;
}

export interface IDialogueList {
    [key: string]: IDialogue;
}