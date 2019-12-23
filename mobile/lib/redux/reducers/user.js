import {SET_TOKEN, SET_USER} from "../actions/user";

const initialState = {
    data: null,
    accessToken: null,
};

export default function user(state = initialState, action) {
    if (action.type === SET_USER) {
        return {...state, data: action.data};
    }
    if (action.type === SET_TOKEN) {
        return {...state, accessToken: action.accessToken};
    }
    return state;
}
