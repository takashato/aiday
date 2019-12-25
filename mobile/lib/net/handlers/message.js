import store from "../../redux/store";
import {pushMessage, setMessages} from "../../redux/actions/message";

export function handleRetrieveMessage(msg) {
    if (!msg.room_id || !msg.messages) return;
    store.dispatch(setMessages(msg.room_id, msg.messages));
}

export function handleMessage(msg) {
    if (!msg.room_id || !msg.message) return;
    store.dispatch(pushMessage(msg.room_id, msg.message));
}
