import sequelize from "../db";

const RoomUser = sequelize.import(__dirname + '/room_user');

export default RoomUser;
