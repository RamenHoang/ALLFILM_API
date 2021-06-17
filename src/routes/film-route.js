const express = require('express');

const { film } = require('../controllers');
const auth = require('../middlewares/auth');

const route = express.Router();

route.get('', film.list);

route.get('/:id', film.getById);

route.post('/:id/rating/:point', auth, film.rating);

module.exports = route;
