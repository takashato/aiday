import AsyncStorage from "@react-native-community/async-storage";
import {SET_APP_MAIN_TITLE, SET_APP_THEME} from "../actions/app";

const initialState = {
    theme: 'dark',
    title: '',
};

export default function appReducer(state = initialState, action) {
    if (action.type === SET_APP_THEME) {
        return {...state, theme: action.theme};
    }
    if (action.type === SET_APP_MAIN_TITLE) {
        return {...state, title: action.title};
    }
    return state;
}
