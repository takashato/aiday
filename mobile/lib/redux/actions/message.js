import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import getSocket from "../../net/socketio";
import store from "../store";
import {PopoverPlacements} from "react-native-ui-kitten/ui/popover/type";

export const SET_ROOM_ID = 'SET_ROOM_ID';
export const SET_MESSAGE = 'SET_MESSAGE';
export const PUSH_MESSAGE = 'PUSH_MESSAGE';
export const REMOVE_MESSAGE_STAMP = 'REMOVE_MESSAGE_STAMP';
export const SET_REFRESHING_MESSAGE = 'SET_REFRESHING_MESSAGE';
export const SET_CHAT_MODE = 'SET_CHAT_MODE';

export function setRoomId(roomId) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_ROOM_ID,
            roomId: roomId,
        });
        console.log(getState().message.messages);
        if (!getState().message.messages || !getState().message.messages[roomId] || getState().message.messages[roomId].loaded === false || getState().message.messages[roomId].length <= 0) {
            dispatch(setRefreshingMessage(true));
            getSocket().emit('retrieve message', {room_id: roomId});
        }
    };
}

export function setRefreshingMessage(refreshing) {
    return (dispatch) => {
        dispatch({
            type: SET_REFRESHING_MESSAGE,
            refreshing
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
        dispatch(setRefreshingMessage(false));
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

export function removeMessageStamp(roomId, stamp) {
    return {
        type: REMOVE_MESSAGE_STAMP,
        roomId: roomId,
        stamp: stamp,
    };
}

export function setChatMode(chatMode) {
    return {
        type: SET_CHAT_MODE,
        mode: chatMode,
    }
}
