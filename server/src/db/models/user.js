/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		birthday: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		display_name: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		is_admin: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
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
		tableName: 'user'
	});
};
