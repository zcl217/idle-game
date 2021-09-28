import { HUFS_JOURNAL_VOL_1, HUFS_JOURNAL_VOL_2, HUFS_JOURNAL_VOL_3 } from "./volumeTexts"


export const LIBRARY_COLLECTIONS: Record<string, string> = {
    HUFS_JOURNAL: 'hufsJournal',
    TODO: 'mercenary',

}

export const COLLECTION_NAME: Record<string, string> = {
    [LIBRARY_COLLECTIONS.HUFS_JOURNAL]: `Huf's Journal`,
    [LIBRARY_COLLECTIONS.TODO]: `todo`,
}
/*
Collection rewards:
Huf's journal: -2/s worker food consumption



*/

export const COLLECTION_REWARDS_TEXT: Record<string, string> = {
    [LIBRARY_COLLECTIONS.HUFS_JOURNAL]: 'Worker food consumption -2/s',
    [LIBRARY_COLLECTIONS.TODO]: 'Unlocks dwarven engineering',
}

export const COLLECTION_VOLUMES: Record<string, Array<string>> = {
    [LIBRARY_COLLECTIONS.HUFS_JOURNAL]: [HUFS_JOURNAL_VOL_1, HUFS_JOURNAL_VOL_2, HUFS_JOURNAL_VOL_3],
    [LIBRARY_COLLECTIONS.TODO]: [],

}







