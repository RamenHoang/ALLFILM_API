const express = require('express');

const route = express.Router();
const { booking } = require('../controllers');
const auth = require('../middlewares/auth');

route.post('', auth, booking.bookTicket);

module.exports = route;
