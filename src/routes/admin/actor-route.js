const express = require('express');

const route = express.Router();
const { actor } = require('../../controllers/admin');

route.get('/list', actor.list);

route.get('/edit/:id', actor.getById);

route.post('/edit/:id', actor.updateById);

route.get('/:id', actor.getById);

route.get('/delete/:id', actor.deleteById);

route.get('/add', actor.getById);

route.post('/add', actor.createNew);

route.get('/', actor.get);

module.exports = route;
