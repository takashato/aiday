export const SET_ROOM_LIST = 'SET_ROOM_LIST';
export const SET_ROOM_REFRESHING = 'SET_ROOM_REFRESHING';

export function setRoomList(list) {
    return (dispatch) => {
        dispatch({
            type: SET_ROOM_LIST,
            list: list,
        });
    };
}

export function setRefreshing(refreshing) {
    return dispatch => {
        dispatch({
            type: SET_ROOM_REFRESHING,
            refreshing,
        });
    };
}
