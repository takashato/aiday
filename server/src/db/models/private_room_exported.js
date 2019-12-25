import sequelize from "../db";

const PrivateRoom = sequelize.import(__dirname + '/private_room');

export default PrivateRoom;
