const express = require('express');

const route = express.Router();
const { session } = require('../../controllers/admin');

route.get('/list', session.list);

route.get('/edit/:id', session.getById);

route.post('/edit/:id', session.updateById);

// route.get('/:id', session.getById);

route.get('/delete/:id', session.deleteById);

route.get('/add', session.getById);

route.post('/add', session.createNew);

route.get('', session.get);

module.exports = route;
