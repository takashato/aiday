import {doLogin, doRegister} from "./login";
import * as JWT from "jsonwebtoken";
import serverConfig from '../../../config/server';
import User from "../../../db/models/user_exported";
import {retrieveContactList} from "./user";
import RoomUser from "../../../db/models/room_user_exported";
import {subscribeAllRoom} from "../helpers/room";
import {createRoom} from "./room";
import userSocketMap from "../storages/user_socket_map";

function applyHandlers(socket) {
    socket.on('login', doLogin);
    socket.on('register', doRegister);

    socket.on('session init', initSession);
    socket.on('session destroy', destroySession);

    socket.on('disconnect', onDisconnected);
    socket.on('reconnect', onReconnected);
}

const userHandlers = [
    {
        event: 'retrieve contact list',
        handler: retrieveContactList,
    }, {
        event: 'create room',
        handler: createRoom,
    }
];

function bindUserHandlers(socket) {
    for (let handler of userHandlers) {
        socket.on(handler.event, handler.handler);
    }
}

function unbindUserHandlers(socket) {
    for (let handler of userHandlers) {
        socket.off(handler.event, handler.handler);
    }
}

async function onDisconnected() {
    destroySession.bind(this)({});
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
        bindUserHandlers(this);
        userSocketMap[user.id] = this; // Push to map
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
        // Subscribe all room
        subscribeAllRoom(this);
    } catch (err) {
        this.emit('session init response', {error: 'Token không hợp lệ.'});
    }
}

async function destroySession(msg) {
    if (!this.user) return;
    delete userSocketMap[this.user.id]; // Delete from map
    this.user = undefined;
    unbindUserHandlers(this);
    this.emit('session destroy response', {});
}

export default applyHandlers;
