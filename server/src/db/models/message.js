/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('message', {
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
			allowNull: true
		},
		message: {
			type: DataTypes.TEXT,
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
		tableName: 'message'
	});
};
