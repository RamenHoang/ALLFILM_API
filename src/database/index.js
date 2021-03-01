const Sequelize = require('sequelize');
const cls = require('cls-hooked');

const namespace = cls.createNamespace('transaction');

Sequelize.default.useCLS(namespace);

const masterDB = require('./masterdb');

exports.masterDB = masterDB;
