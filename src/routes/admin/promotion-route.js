const express = require('express');

const route = express.Router();
const { promotion } = require('../../controllers/admin');

route.get('/list', promotion.list);

route.get('/edit/:id', promotion.getById);

route.post('/edit/:id', promotion.updateById);

route.get('/:id', promotion.getById);

route.get('/delete/:id', promotion.deleteById);

route.get('/add', promotion.getById);

route.post('/add', promotion.createNew);

module.exports = route;
