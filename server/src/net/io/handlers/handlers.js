import {doLogin, doRegister} from "./login";
import * as JWT from "jsonwebtoken";
import serverConfig from '../../../config/server';
import User from "../../../db/models/user_exported";

function applyHandlers(socket) {
    socket.on('login', doLogin);
    socket.on('register', doRegister);

    socket.on('session init', initSession);
    socket.on('session destroy', destroySession);

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
    console.log(this.user);
}

async function initSession(msg) {
    const {accessToken} = msg;
    if (!accessToken) {
        this.emit('session init response', {error: 'Vui lòng cung cấp access token.'});
        return;
    }
    try {
        const decoded = await JWT.verify(accessToken, serverConfig.jwtSecretKey);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            this.emit('session init response', {error: 'Người dùng không tồn tại.'});
            return;
        }

        this.user = user;
        this.emit('session init response', {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                birthday: user.birthday,
                display_name: user.display_name,
                is_admin: user.is_admin,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
        });
    } catch (err) {
        this.emit('session init response', {error: 'Token không hợp lệ.'});
    }
}

async function destroySession(msg) {
    this.user = undefined;
    this.emit('session destroy response', {});
}

export default applyHandlers;
