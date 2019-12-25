import sequelize from "../db";
import User from "./user_exported";

const Message = sequelize.import(__dirname + '/message');
Message.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
User.hasMany(Message, {foreignKey: 'user_id'});

export default Message;
