const express = require('express');

const route = express.Router();
const { promotion } = require('../controllers');

route.get('/:id', promotion.getById);

route.get('', promotion.list);

route.post('', promotion.subscribe);

module.exports = route;
