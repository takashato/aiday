export const SET_ROOM_ID = 'SET_ROOM_ID';
export const SET_MESSAGE = 'SET_MESSAGE';
export const PUSH_MESSAGE = 'PUSH_MESSAGE';

export function setRoomId(roomId) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_ROOM_ID,
            roomId: roomId,
        });
    };
}

export function fetchMessages(roomId) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_MESSAGE,
            roomId: roomId,
        });
    };
}
