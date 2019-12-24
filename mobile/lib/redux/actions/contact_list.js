export const SET_CONTACT_LIST = 'SET_CONTACT_LIST';

export function setContactList(list) {
    return {
        type: SET_CONTACT_LIST,
        list,
    };
}
