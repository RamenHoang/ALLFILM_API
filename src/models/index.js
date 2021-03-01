const fs = require('fs');
const path = require('path');
const { masterDB } = require('../database');

const basename = path.basename(__filename);
const { sequelize } = masterDB;
const db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.masterDB = sequelize;

module.exports = db;
