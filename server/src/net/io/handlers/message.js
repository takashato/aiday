import Message from "../../../db/models/message_exported";
import User from "../../../db/models/user_exported";
import {io} from "../../../server";
import Room from "../../../db/models/room_exported";
import {subscribeRoom} from "../helpers/room";
import RoomUser from "../../../db/models/room_user_exported";
import moment from "moment";

export async function retrieveMessage(msg) {
    const step = msg.step || 0;
    const {room_id} = msg;
    if (!room_id) {
        return;
    }
    if (!this.subscribedRooms.includes('@' + room_id)) {
        // TODO check
        const room = await Room.findByPk(room_id);
        if (!room) return;
        const roomUser = await RoomUser.build({
            room_id: room_id,
            user_id: this.user.id,
            role_id: 1,
        });
        if (!await roomUser.save()) return;
        await subscribeRoom(this, room_id);
    }
    try {
        const messages = await Message.findAll({
            where: {
                room_id: room_id
            },
            order: [['id', 'desc']],
            limit: 20,
            offset: 20 * step,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'display_name', 'is_admin', 'avatar'],
                }
            ]
        });
        const res = [];
        for (let message of messages) {
            res.unshift({
                id: message.id,
                message: message.message,
                created_at: message.created_at,
                updated_at: message.updated_at,
                user: {
                    id: message.user.id,
                    username: message.user.username,
                    display_name: message.user.display_name,
                    is_admin: message.user.is_admin,
                    avatar: message.user.avatar,
                },
                pending_stamp: 0,
            });
        }
        this.emit('messages', {
            room_id: room_id,
            messages: res,
        });
    } catch (err) {
        console.log(err);
    }
}

export async function pushMessage(msg) {
    const {room_id, message} = msg;
    if (!room_id || !message) {
        this.emit('push message result', {error: 'Thiếu giá trị truyền.', code: 'missing_fields'});
        return;
    }
    if (!this.subscribedRooms || !this.subscribedRooms.includes('@' + room_id)) {
        this.emit('push message result', {
            error: 'Bạn không được phép gửi tin nhắn vào phòng này.',
            code: 'unauthorized'
        });
        return;
    }
    const messageObj = await Message.build({
        room_id: room_id,
        user_id: this.user.id,
        message: msg.message,
    });
    if (!await messageObj.save()) {
        this.emit('push message result', {
            error: 'Không thể lưu lại tin nhắn.',
            code: 'save_error'
        });
        return;
    }

    this.emit('push message response', {
        room_id: room_id,
        pending_stamp: msg.pending_stamp,
    });
    this.in('@' + room_id).emit('message', {
        room_id: room_id,
        message: {
            id: messageObj.id,
            message: message,
            user: {
                avatar: this.user.avatar,
                id: this.user.id,
                username: this.user.username,
                display_name: this.user.display_name,
                is_admin: this.user.is_admin
            },
            created_at: messageObj.created_at,
            updated_at: moment().format(),
            pending_stamp: 0,
        }
    });
}
