const express = require('express');

const route = express.Router();
const { director } = require('../../controllers/admin');

// route.get('/list', film.list);

// route.get('/edit/:id', film.getById);

// route.post('/edit/:id', film.updateById);

// route.get('/:id', film.getById);

// route.get('/delete/:id', film.deleteById);

// route.get('/add', film.getById);

// route.post('/add', film.createNew);

route.get('/', director.get);

module.exports = route;
