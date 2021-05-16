const express = require('express');

const route = express.Router();
const { director } = require('../../controllers/admin');

route.get('/list', director.list);

route.get('/edit/:id', director.getById);

route.post('/edit/:id', director.updateById);

route.get('/:id', director.getById);

route.get('/delete/:id', director.deleteById);

route.get('/add', director.getById);

route.post('/add', director.createNew);

route.get('/', director.get);

module.exports = route;
