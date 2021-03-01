const winston = require('winston');
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  },
);

const masterDB = module.exports;

masterDB.init = (callback) => {
  sequelize
    .authenticate()
    .then(() => {
      winston.info('Connection to MasterDB has been established successfully.');
      callback(null);
    })
    .catch((err) => {
      winston.error('Unable to connect to MasterDB:', err);
      callback(err);
    });
};

masterDB.disconnect = (callback) => {
  sequelize.close();

  callback(null);
};

masterDB.sequelize = sequelize;
