import User from "../../../db/models/user_exported";
import PrivateRoom from "../../../db/models/private_room_exported";
import {Op} from "sequelize";
import {makeUserIdsInOrder} from "../helpers/room";

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
