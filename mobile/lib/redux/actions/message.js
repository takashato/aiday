import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import getSocket from "../../net/socketio";

export const SET_ROOM_ID = 'SET_ROOM_ID';
export const SET_MESSAGE = 'SET_MESSAGE';
export const PUSH_MESSAGE = 'PUSH_MESSAGE';

export function setRoomId(roomId) {
    return (dispatch, getState) => {
        if (!getState().message.messages || !getState().message.messages[roomId] || getState().message.messages[roomId].length <= 0) {
            getSocket().emit('retrieve message', {room_id: roomId});
        }
        dispatch({
            type: SET_ROOM_ID,
            roomId: roomId,
        });
    };
}

export function setMessages(roomId, messages) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_MESSAGE,
            roomId: roomId,
            messages: messages,
        });
    };
}

export function pushMessage(roomId, message) {
    return (dispatch, getState) => {
        dispatch({
            type: PUSH_MESSAGE,
            roomId: roomId,
            message: message,
        });
    };
}
