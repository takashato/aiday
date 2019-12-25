import {PUSH_MESSAGE, SET_MESSAGE, SET_ROOM_ID} from "../actions/message";

const initialState = {
    roomId: null,
    messages: {
        placeholder: '',
    },
};

export function messageReducer(state = initialState, action) {
    if (action.type === SET_ROOM_ID) {
        return {...state, roomId: action.roomId};
    }
    if (action.type === SET_MESSAGE) {
        const newState = {...state};
        if (!newState.messages) newState.messages = {};
        newState.messages[action.roomId] = action.messages;
        return newState;
    }
    if (action.type === PUSH_MESSAGE) {
        const newState = {...state};
        if (!newState.messages) newState.messages = {};
        if (!newState.messages[action.roomId])
            newState.messages[action.roomId] = [];
        newState.messages[action.roomId].push(action.message);
        return newState;
    }
    return state;
}
