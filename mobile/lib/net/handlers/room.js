import store from "../../redux/store";
import {setRoomList} from "../../redux/actions/room";

export function handleRoomList(msg) {
    store.dispatch(setRoomList(msg.list));

}
