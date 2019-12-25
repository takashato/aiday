/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('private_room', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		room_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		user1_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		user2_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'private_room'
	});
};
