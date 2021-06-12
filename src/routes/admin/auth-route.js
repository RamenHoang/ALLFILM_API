const express = require('express');
const { auth } = require('../../controllers/admin');
const adminAuth = require('../../middlewares/admin-auth');

const route = express.Router();

route.get('/login', auth.login);

route.post('/login', auth.login);

route.get('/dashboard', adminAuth, auth.dashboard);

route.get('/logout', adminAuth, auth.logout);

module.exports = route;
