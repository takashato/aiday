import {combineReducers} from "redux";
import user from "./user";
import contactList from "./contact_list";
import {messageReducer} from "./message";

const reducers = combineReducers({
    user,
    contactList,
    message: messageReducer,
});

export default reducers;
