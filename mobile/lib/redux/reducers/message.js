import {
    PUSH_MESSAGE,
    REMOVE_MESSAGE_STAMP,
    SET_CHAT_MODE,
    SET_MESSAGE,
    SET_REFRESHING_MESSAGE,
    SET_ROOM_ID
} from "../actions/message";

const initialState = {
    roomId: null,
    messages: {
        placeholder: '', // Make sure that object initialized
    },
    refreshing: false,
    chatMode: 'multiple',
};

export function messageReducer(state = initialState, action) {
    if (action.type === SET_ROOM_ID) {
        return {...state, roomId: action.roomId};
    }
    if (action.type === SET_REFRESHING_MESSAGE) {
        return {...state, refreshing: action.refreshing};
    }
    if (action.type === SET_MESSAGE) {
        const newState = {...state};
        if (!newState.messages) newState.messages = {};
        if (newState.messages[action.roomId] && newState.messages[action.roomId].loaded === false) {
            newState.messages[action.roomId].loaded = true;
            newState.messages[action.roomId].data = action.messages.concat(newState.messages[action.roomId].data);
        } else {
            console.log('Set new messages');
            newState.messages[action.roomId] = {
                loaded: action.messages.length > 0,
                data: action.messages,
            };
        }
        return newState;
    }
    if (action.type === PUSH_MESSAGE) {
        const newState = {...state};
        if (!newState.messages) newState.messages = {};
        if (!newState.messages[action.roomId])
            newState.messages[action.roomId] = {
                loaded: false,
                data: [],
            };
        newState.messages[action.roomId].data.push(action.message);
        return newState;
    }
    if (action.type === REMOVE_MESSAGE_STAMP) {
        const newState = {...state};
        if (newState.messages[action.roomId]) {
            const messages = newState.messages[action.roomId].data;
            for (let i = messages.length - 1; i >= 0; --i) {
                if (messages[i].pending_stamp === action.stamp) {
                    messages[i].pending_stamp = 0;
                }
            }
        }
        return newState;
    }
    if (action.type === SET_CHAT_MODE) {
        return {...state, mode: action.mode};
    }
    return state;
}
