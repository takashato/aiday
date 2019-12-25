import Message from "../../../db/models/message_exported";
import User from "../../../db/models/user_exported";
import {io} from "../../../server";

export async function retrieveMessage(msg) {
    console.log('retrieve messages');
    const step = msg.step || 0;
    const {room_id} = msg;
    if (!room_id) {
        return;
    }
    if (!this.subscribedRooms.includes('@' + room_id)) return;
    const messages = await Message.findAll({
        where: {
            room_id: room_id
        },
        order: [['updated_at', 'desc']],
        limit: 20,
        offset: 20 * step,
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'username', 'display_name', 'is_admin'],
            }
        ]
    });
    const res = [];
    for (let message of messages) {
        res.push({
            id: message.id,
            message: message.message,
            created_at: message.created_at,
            updated_at: message.updated_at,
            user: message.user,
            avatar: 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png',
        });
    }
    this.emit('messages', {
        room_id: room_id,
        messages: res,
    });
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
    }

    io.in('@' + room_id).emit('message', {
        room_id: room_id,
        message: {
            id: messageObj.id,
            avatar: 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png',
            message: message,
            user: {
                id: this.user.id,
                username: this.user.username,
                display_name: this.user.display_name,
                is_admin: this.user.is_admin
            },
            created_at: messageObj.created_at,
            updated_at: messageObj.updated_at,
        }
    });
}
