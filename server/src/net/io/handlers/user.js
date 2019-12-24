import User from "../../../db/models/user_exported";

export async function retrieveContactList(msg) {
    const users = await User.findAll({order: [['username', 'asc']]});
    let res = [];
    for (let user of users) {
        res.push({id: user.id, username: user.username, display_name: user.display_name});
    }
    this.emit('contact list', {
        list: res,
    });
}
