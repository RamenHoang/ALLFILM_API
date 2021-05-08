const express = require('express');
const { session } = require('../controllers');

const route = express.Router();

route.get('', session.list);

route.get('/:id(\\d+)', session.getById);

module.exports = route;
