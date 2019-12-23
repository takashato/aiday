import sequelize from "../db";

const User = sequelize.import(__dirname + '/user');

export default User;
