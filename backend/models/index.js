const dbConfig = require('../config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.db.database, dbConfig.db.user, dbConfig.db.password, {
  host: dbConfig.db.host,
  dialect: dbConfig.db.dialect,
  define: {
    timestamps: false,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model')(sequelize, Sequelize);
db.tasks = require('./task.model')(sequelize, Sequelize);

module.exports = db;