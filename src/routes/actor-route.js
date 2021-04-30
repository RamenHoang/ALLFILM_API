const express = require('express');
const route = express.Router();
const { actor } = require('../controllers');

route.get('/:id', actor.getById);

module.exports = route;
