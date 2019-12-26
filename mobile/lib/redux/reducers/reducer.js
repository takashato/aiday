import {combineReducers} from "redux";
import user from "./user";
import contactList from "./contact_list";
import {messageReducer} from "./message";
import room from "./room";

const reducers = combineReducers({
    user,
    contactList,
    message: messageReducer,
    room,
});

export default reducers;
