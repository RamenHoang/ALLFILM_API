const express = require('express');
const { session } = require('../controllers');

const route = express.Router();

route.get('', session.list);

module.exports = route;
