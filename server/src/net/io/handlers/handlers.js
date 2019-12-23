import {doLogin} from "./login_handlers";

function applyHandlers(socket) {
    socket.on('login', doLogin);
}

export default applyHandlers;