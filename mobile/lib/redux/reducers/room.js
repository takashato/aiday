import {SET_ROOM_LIST, SET_ROOM_REFRESHING} from "../actions/room";

const initialState = {
    list: [],
};

export default function room(state = initialState, action) {
    if (action.type === SET_ROOM_LIST) {
        return {...state, list: action.list, refreshing: false};
    }
    if (action.type === SET_ROOM_REFRESHING) {
        return {...state, refreshing: action.refreshing};
    }
    return state;
}
