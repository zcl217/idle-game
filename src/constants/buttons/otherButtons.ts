import { uniqueId } from "lodash"

export const OTHER_BUTTON_TYPES = {
    LORD_1: uniqueId(),
    LORD_2: uniqueId(),
}

export const OTHER_BUTTON_TEXTS = {
    [OTHER_BUTTON_TYPES.LORD_1]: 'Lord of Hope',
    [OTHER_BUTTON_TYPES.LORD_2]: 'Lord of Destruction',
}
