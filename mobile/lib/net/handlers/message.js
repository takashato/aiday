import store from "../../redux/store";
import {pushMessage, removeMessageStamp, setMessages} from "../../redux/actions/message";

export function handleRetrieveMessage(msg) {
    if (!msg.room_id || !msg.messages) return;
    store.dispatch(setMessages(msg.room_id, msg.messages));
}

export function handleMessage(msg) {
    if (!msg.room_id || !msg.message) return;
    console.log('message', msg.message);
    store.dispatch(pushMessage(msg.room_id, msg.message));
}

export function handlePushMessageResponse(msg) {
    const {room_id, pending_stamp} = msg;
    console.log('push response', msg);
    if (!room_id || !pending_stamp) return;
    store.dispatch(removeMessageStamp(msg.room_id, msg.pending_stamp));
}
