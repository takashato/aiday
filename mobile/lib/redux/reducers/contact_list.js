import {SET_CONTACT_LIST} from "../actions/contact_list";

const initialState = {
    list: [],
};

export default function contactList(state = initialState, action) {
    if (action.type === SET_CONTACT_LIST) {
        return {...state, list: action.list};
    }
    return state;
}
