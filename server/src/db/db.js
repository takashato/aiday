import Sequelize from "sequelize";
import dbConfig from "../config/db"

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    define: {
        underscored: true,
    },
    timezone: dbConfig.timezone,
    dialectOptions: dbConfig.dialectOptions,
});

export default sequelize;

export async function init() {
    try {
        await sequelize.authenticate();
        console.log('>>> Connected to database.');
        return true;
    } catch (e) {
        console.error('Can\'t connect to database: ', e);
        return false;
    }
}
