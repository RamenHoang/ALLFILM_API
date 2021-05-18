const express = require('express');

const route = express.Router();
const { cinema } = require('../../controllers/admin');

route.get('/list', cinema.list);

route.get('/edit/:id', cinema.getById);

route.post('/edit/:id', cinema.updateById);

route.get('/:id', cinema.getById);

route.get('/delete/:id', cinema.deleteById);

route.get('/add', cinema.getById);

route.post('/add', cinema.createNew);

route.get('/', cinema.get);

module.exports = route;
