/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('room_user', {
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
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		role_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
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
		tableName: 'room_user'
	});
};
