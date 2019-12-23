/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('permission', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		role_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		value: {
			type: DataTypes.INTEGER(4),
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
		tableName: 'permission'
	});
};
