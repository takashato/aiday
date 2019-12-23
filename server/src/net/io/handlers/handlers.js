import {doLogin, doRegister} from "./login";

function applyHandlers(socket) {
    socket.on('login', doLogin);
    socket.on('register', doRegister);

    socket.on('disconnect', onDisconnected);
    socket.on('reconnect', onReconnected);
}

async function onDisconnected() {
    let address = this.request.connection.remoteAddress;
    console.log(address + " disconnected.");
}

async function onReconnected() {
    let address = this.request.connection.remoteAddress;
    console.log(address + " reconnected.");
}

export default applyHandlers;
