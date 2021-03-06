import store from "../../redux/store";
import {setContactList} from "../../redux/actions/contact_list";

export function handleContactList(msg) {
    if (msg.list) {
        store.dispatch(setContactList(msg.list));
    }
}
