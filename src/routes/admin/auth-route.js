/* eslint-disable max-len */
const express = require('express');
const { auth } = require('../../controllers/admin');

const route = express.Router();

route.get('/login', auth.login);

route.post('/login', auth.login);

module.exports = route;
