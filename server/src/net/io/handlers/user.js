import User from "../../../db/models/user_exported";
import PrivateRoom from "../../../db/models/private_room_exported";
import {Op} from "sequelize";
import {makeUserIdsInOrder} from "../helpers/room";
import Bcrypt from "bcrypt";

export async function retrieveContactList(msg) {
    const users = await User.findAll({order: [['username', 'asc']]});
    let res = [];
    for (let user of users) {
        if (user.id === this.user.id) continue;
        let roomId = null;
        const {user1_id, user2_id} = makeUserIdsInOrder(this.user.id, user.id);
        const pRoom = await PrivateRoom.findOne({
            where: {
                [Op.and]: [
                    {user1_id},
                    {user2_id},
                ]
            }, attributes: ['room_id'],
        });
        if (pRoom) roomId = pRoom.room_id;
        res.push({
            id: user.id,
            username: user.username,
            display_name: user.display_name,
            room_id: roomId,
            avatar: 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png',
        });
    }
    this.emit('contact list', {
        list: res,
    });
}

export async function changeInfo(msg) {
    if (!msg.field) return;
    const user = this.user;
    if (msg.field === "password") {
        const {old_password, new_password} = msg;
        if (!Bcrypt.compareSync(old_password, this.user.password)) {
            this.emit('update user info res', {error: 'Mật khẩu cũ không đúng.'});
            return;
        }
        this.user.password = Bcrypt.hashSync(new_password, Bcrypt.genSaltSync());
        if (!await this.user.save()) {
            this.emit('update user info res', {error: 'Không thể cập nhật mật khẩu.'});
            return;
        }
        this.emit('update user info res', {});
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
                avatar: user.avatar,
            },
        });
        return;
    }
    if (msg.field === "avatar") {
        const {avatar} = msg;
        this.user.avatar = avatar;
        if (!await this.user.save()) {
            this.emit('update user info res', {error: 'Không thể cập nhật avatar.'});
            return;
        }
        this.emit('update user info res', {});
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
                avatar: user.avatar,
            },
        });
        return;
    }
    if (msg.field === "display_name") {
        const {display_name} = msg;
        this.user.display_name = display_name;
        if (!await this.user.save()) {
            this.emit('update user info res', {error: 'Không thể cập nhật tên hiển thị.'});
            return;
        }
        this.emit('update user info res', {});
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
                avatar: user.avatar,
            },
        });
        return;
    }
}
