import {doLogin} from "./login_handlers";

function applyHandlers(socket) {
    socket.on('login', doLogin);
    socket.on('disconnect', onDisconnected);
}

async function onDisconnected() {
    let address = this.request.connection.remoteAddress;
    console.log(address + " disconnected.");
}

export default applyHandlers;