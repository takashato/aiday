import io from 'socket.io-client';
import config from '../config';
import store from "../redux/store";
import {setUser} from "../redux/actions/user";
import {handleContactList} from "./handlers/contact_list";
import {handleMessage, handlePushMessageResponse, handleRetrieveMessage} from "./handlers/message";

let socket = null;

export function init() {
    return new Promise((resolve, reject) => {
        if (socket) {
            return resolve(true);
        }
        socket = io(config.webUrl, config.options);

        socket.on('connect', function () {
            console.log('Connected to server.');
            resolve(true);
        });

        socket.on('connect_error', function (err) {
            reject(err);
        });

        socket.on('error', (err) => {
            reject(err);
        });

        socket.on('reconnect', handleReconnect);

        socket.on('session init response', handleInitSession);
        socket.on('session destroy response', handleDestroySession);

        // Handler area
        socket.on('contact list', handleContactList);

        socket.on('messages', handleRetrieveMessage);
        socket.on('message', handleMessage);
        socket.on('push message response', handlePushMessageResponse);
    });
}

function getSocket() {
    return socket;
}

async function handleInitSession(msg) {
    if (msg.error) {
        console.log(msg.error);
        return;
    }
    console.log('Session initialized successfully.');
    store.dispatch(setUser(msg.user));
}

async function handleDestroySession(msg) {
    console.log('Session destroyed successfully.');
    store.dispatch(setUser(null));
}

async function handleReconnect(msg) {
    const token = store.getState().user.accessToken;
    getSocket().emit('session init', {accessToken: token});
}

export default getSocket;
