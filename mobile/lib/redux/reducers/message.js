import {SET_ROOM_ID} from "../actions/message";

const initialState = {
    roomId: null,
    messages: {},
};

export function messageReducer(state = initialState, action) {
    if (action === SET_ROOM_ID) {
        return {...state, roomId: action.roomId};
    }
    return state;
}
