const dbConfig = require('./config/db');
var SequelizeAuto = require('sequelize-auto');
var auto = new SequelizeAuto(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    directory: __dirname + '/db/models',
});

auto.run(function (err) {
    if (err) throw err;
    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});
