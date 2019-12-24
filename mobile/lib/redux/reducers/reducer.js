import {combineReducers} from "redux";
import user from "./user";
import contactList from "./contact_list";

const reducers = combineReducers({
    user,
    contactList,
});

export default reducers;
