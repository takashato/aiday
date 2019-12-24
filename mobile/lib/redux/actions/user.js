import getSocket from "../../net/socketio";
import AsyncStorage from '@react-native-community/async-storage';
import store from "../store";

export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';

export function setUser(user) {
    return {
        type: SET_USER,
        data: user,
    };
}

export function setToken(token) {
    return async (dispatch) => {
        if (token) {
            getSocket().emit('session init', {accessToken: token});
            try {
                await AsyncStorage.setItem('accessToken', token);
            } catch (err) {
                console.log('Cant store persist token.')
            }
        } else {
            getSocket().emit('session destroy', {});
            try {
                await AsyncStorage.removeItem('accessToken');
            } catch (err) {
                console.log('Cant remove persist token.')
            }
        }

        dispatch({type: SET_TOKEN, accessToken: token});
    };
}
