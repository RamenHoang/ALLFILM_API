const express = require('express');

const route = express.Router();
const { foodDrink } = require('../controllers');

route.get('', foodDrink.list);

module.exports = route;
