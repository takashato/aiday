/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('role', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		room_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		creator_id: {
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
		tableName: 'role'
	});
};
