/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('room', {
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
		creator_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(32),
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
		tableName: 'room'
	});
};
