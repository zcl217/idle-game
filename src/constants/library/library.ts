import { HUFS_JOURNAL_VOL_1, HUFS_JOURNAL_VOL_2, HUFS_JOURNAL_VOL_3 } from "./volumeTexts"


export const LIBRARY_COLLECTIONS: Record<string, string> = {
    HUFS_JOURNAL: 'hufsJournal',

}

export const COLLECTION_NAME: Record<string, string> = {
    [LIBRARY_COLLECTIONS.HUFS_JOURNAL]: `Huf's Journal`,
}
/*
Collection rewards:
Huf's journal: -2/s worker food consumption



*/

export const COLLECTION_REWARDS_TEXT: Record<string, string> = {
    [LIBRARY_COLLECTIONS.HUFS_JOURNAL]: 'Worker food consumption -2/s'
}

export const COLLECTION_VOLUMES: Record<string, Array<string>> = {
    [LIBRARY_COLLECTIONS.HUFS_JOURNAL]: [HUFS_JOURNAL_VOL_1, HUFS_JOURNAL_VOL_2, HUFS_JOURNAL_VOL_3]

}







