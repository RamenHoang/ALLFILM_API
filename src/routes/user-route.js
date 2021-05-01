const express = require('express');
const route = express.Router();
const auth = require('../middlewares/auth');
const { user } = require('../controllers');

route.get('/:id', auth, user.getById);

route.get('', auth, user.list);

route.put('/:id', auth, user.updateProfile);

route.post('', auth, user.createUser);

module.exports = route;
