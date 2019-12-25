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
    }
}
