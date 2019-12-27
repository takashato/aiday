export const SET_APP_THEME = 'SET_APP_THEME';
export const SET_APP_MAIN_TITLE = 'SET_APP_MAIN_TITLE';
export const SET_CHAT_TITLE = 'SET_CHAT_TITLE';

export function setAppTheme(theme) {
    return dispatch => {
        dispatch({
            type: SET_APP_THEME,
            theme,
        });
    };
}

export function setAppMainTitle(title) {
    return dispatch => {
        dispatch({
            type: SET_APP_MAIN_TITLE,
            title,
        })
    };
}

export function setChatTitle(title) {
    return dispatch => {
        dispatch({
            type: SET_CHAT_TITLE,
            title,
        })
    };
}
