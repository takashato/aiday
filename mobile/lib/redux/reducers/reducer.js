import {combineReducers} from "redux";
import user from "./user";
import contactList from "./contact_list";
import {messageReducer} from "./message";
import room from "./room";
import appReducer from "./app";

const reducers = combineReducers({
    app: appReducer,
    user,
    contactList,
    message: messageReducer,
    room,
});

export default reducers;
