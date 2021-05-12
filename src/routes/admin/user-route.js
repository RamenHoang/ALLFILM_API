const express = require('express');

const route = express.Router();
const { user } = require('../../controllers/admin');

route.get('/list', user.list);

route.get('/edit/:id', user.getById);

route.post('/edit/:id', user.updateById);

route.get('/:id', user.getById);

route.get('/delete/:id', user.deleteById);

route.get('/add', user.getById);

route.post('/add', user.createNew);

module.exports = route;
