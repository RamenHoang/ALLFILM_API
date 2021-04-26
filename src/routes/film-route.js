const express = require('express');
const { film } = require('../controllers');

const route = express.Router();

route.get('', film.list);

route.get('/:id', film.getById);

module.exports = route;
