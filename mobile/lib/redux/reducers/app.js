import AsyncStorage from "@react-native-community/async-storage";
import {SET_APP_MAIN_TITLE, SET_APP_THEME, SET_CHAT_TITLE} from "../actions/app";

const initialState = {
    theme: 'dark',
    title: '',
    chatTitle: 'Chat',
};

export default function appReducer(state = initialState, action) {
    if (action.type === SET_APP_THEME) {
        return {...state, theme: action.theme};
    }
    if (action.type === SET_APP_MAIN_TITLE) {
        return {...state, title: action.title};
    }
    if (action.type === SET_CHAT_TITLE) {
        return {...state, chatTitle: action.title};
    }
    return state;
}
