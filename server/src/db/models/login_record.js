/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('login_record', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		ip: {
			type: DataTypes.STRING(32),
			allowNull: true
		},
		extra: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'login_record'
	});
};
