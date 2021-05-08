const express = require('express');

const route = express.Router();
const { director } = require('../controllers');

route.get('/:id', director.getById);

module.exports = route;
