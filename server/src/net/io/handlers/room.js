import User from "../../../db/models/user_exported";
import PrivateRoom from "../../../db/models/private_room_exported";
import {Op} from "sequelize";
import sequelize from "../../../db/db";
import Room from "../../../db/models/room_exported";
import RoomUser from "../../../db/models/room_user_exported";
import {makeUserIdsInOrder, subscribeRoom} from "../helpers/room";
import {retrieveContactList} from "./user";
import userSocketMap from "../storages/user_socket_map";

export async function createRoom(msg = {is_private: false}) {
    if (msg.is_private) {
        const otherUser = await User.findByPk(msg.user_id);
        if (!otherUser) {
            this.emit('create room result', {error: 'Người dùng không tồn tại'});
            return;
        }
        // Check availability
        let {user1_id, user2_id} = makeUserIdsInOrder(this.user.id, msg.user_id);
        const pRoom = await PrivateRoom.findOne({
            where: {
                [Op.and]: [
                    {user1_id},
                    {user2_id},
                ]
            }
        });
        if (pRoom) {
            this.emit('create room result', {error: 'Phòng đã được tạo.'});
            return;
        }
        let transaction;
        try {
            transaction = await sequelize.transaction();
            // Create room
            const room = Room.build({
                name: `${user1_id} - ${user2_id}`,
                is_private: 1,
                creator_id: this.user.id,
            });
            if (!await room.save({transaction})) {
                await transaction.rollback();
                this.emit('create room result', {error: 'Không thể tạo phòng.'});
            }
            // Add room to user
            const rUser1 = await RoomUser.build({
                room_id: room.id,
                user_id: user1_id,
                role_id: 0,
            });
            const rUser2 = await RoomUser.build({
                room_id: room.id,
                user_id: user2_id,
                role_id: 0,
            });
            if (!await rUser1.save({transaction}) || !await rUser2.save({transaction})) {
                await transaction.rollback();
                this.emit('create room result', {error: 'Không thể tạo phòng.'});
            }
            // Create as private room
            const npRoom = await PrivateRoom.build({
                room_id: room.id,
                user1_id: user1_id,
                user2_id: user2_id,
            });
            if (!await npRoom.save({transaction})) {
                await transaction.rollback();
                this.emit('create room result', {error: 'Không thể tạo phòng.'});
            }
            await transaction.commit();
            this.emit('create room result', {}); // Success

            // Assign
            if (!this.roomIds) this.roomIds = [];
            this.roomIds.push(room.id);
            // Subscribe
            await subscribeRoom(this, room.id);
            const otherSocket = userSocketMap[msg.user_id];
            if (otherSocket) {
                await subscribeRoom(otherSocket, room.id);
            }
            // Retrieve contact list
            await retrieveContactList.bind(this)({});
        } catch (err) {
            console.log(err);
            if (transaction) await transaction.rollback();
        }
    } else {
        if (!msg.name || msg.name == "") {
            this.emit('create public room result', {error: 'Vui lòng nhập tên phòng.'});
        }
        let transaction;
        try {
            transaction = await sequelize.transaction();
            // Create room
            const obj = {
                name: msg.name,
                is_private: 0,
                creator_id: this.user.id,
            };
            if (msg.password) obj.password = msg.password;
            const room = Room.build(obj);
            if (!await room.save({transaction})) {
                await transaction.rollback();
                this.emit('create public room result', {error: 'Không thể tạo phòng.'});
            }
            // Add room to user
            const rUser1 = await RoomUser.build({
                room_id: room.id,
                user_id: this.user.id,
                role_id: 0,
            });
            if (!await rUser1.save({transaction})) {
                await transaction.rollback();
                this.emit('create public room result', {error: 'Không thể tạo phòng.'});
            }
            await transaction.commit();
            this.emit('create public room result', {}); // Success

            // Assign
            if (!this.roomIds) this.roomIds = [];
            this.roomIds.push(room.id);
            // Subscribe
            await subscribeRoom(this, room.id);
            // Retrieve contact list
            await retrieveRoomList.bind(this)({});
        } catch (err) {
            console.log(err);
            if (transaction) await transaction.rollback();
        }
    }
}

export async function retrieveRoomList(msg) {
    const rooms = await Room.findAll({
        where: {is_private: 0},
        order: [['id', 'desc']]
    });
    const res = [];
    for (let room of rooms) {
        res.push({
            id: room.id,
            name: room.name,
            created_at: room.created_at,
            updated_at: room.updated_at,
        });
    }
    this.emit('room list', {
        list: res,
    });
}
