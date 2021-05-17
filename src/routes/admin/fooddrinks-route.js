const express = require('express');

const route = express.Router();
const { fooddrink } = require('../../controllers/admin');

route.get('/list', fooddrink.list);

route.get('/edit/:id', fooddrink.getById);

route.post('/edit/:id', fooddrink.updateById);

route.get('/:id', fooddrink.getById);

route.get('/delete/:id', fooddrink.deleteById);

route.get('/add', fooddrink.getById);

route.post('/add', fooddrink.createNew);

module.exports = route;
