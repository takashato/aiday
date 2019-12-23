export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';

export function setUser(user) {
    return {
        type: SET_USER,
        data: user,
    };
}
