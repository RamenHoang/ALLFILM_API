const express = require('express');

const route = express.Router();
const { room } = require('../../controllers/admin');

route.get('/list', room.list);

route.get('/edit/:id', room.getById);

route.post('/edit/:id', room.updateById);

route.get('/:id', room.getById);

route.get('/delete/:id', room.deleteById);

route.get('/add', room.getById);

route.post('/add', room.createNew);

module.exports = route;
