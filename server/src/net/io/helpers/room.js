import {Op} from 'sequelize';
import RoomUser from "../../../db/models/room_user_exported";

export async function retrieveRoomIdsFromDb(socket) {
    if (!socket.user) return false;
    const user_id = socket.user.id;
    try {
        const roomUsers = await RoomUser.findAll({
            where: {user_id: user_id},
            attributes: ['room_id']
        });
        socket.roomIds = [];
        for (let roomUser of roomUsers) {
            socket.roomIds.push(roomUser.room_id);
        }
        return true;
    } catch (err) {
        return false;
    }
}

export async function subscribeRoom(socket, room_id) {
    if (!socket.user) return false;
    const user_id = socket.user.id;
    const roomUser = await RoomUser.findOne({
        where: {
            [Op.and]: [
                {user_id: user_id},
                {room_id: room_id},
            ]
        }
    });
    if (!roomUser) return false;
    const socketIORoomName = '@' + room_id;
    socket.join(socketIORoomName);
    if (!socket.subscribedRooms) socket.subscribedRooms = [];
    socket.subscribedRooms.push(socketIORoomName);
    console.log(`- User ID ${user_id} (socket ID ${socket.id}) subscribed from room ID @${room_id}`);
    return true;
}

export async function subscribeAllRoom(socket) {
    if (!await retrieveRoomIdsFromDb(socket)) return false;
    for (let roomId of socket.roomIds) {
        await subscribeRoom(socket, roomId);
    }
    return true;
}

export function makeUserIdsInOrder(iUser1_id, iUser2_id) {
    let user1_id, user2_id;
    if (iUser1_id < iUser2_id) {
        user1_id = iUser1_id;
        user2_id = iUser2_id;
    } else {
        user1_id = iUser2_id;
        user2_id = iUser1_id;
    }
    return {user1_id: user1_id, user2_id: user2_id};
}
