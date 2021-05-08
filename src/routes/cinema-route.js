const express = require('express');

const route = express.Router();
const { cinema } = require('../controllers');

route.get('', cinema.list);

module.exports = route;
