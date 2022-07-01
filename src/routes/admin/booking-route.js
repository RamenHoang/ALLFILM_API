const express = require('express');

const route = express.Router();
const { booking } = require('../../controllers/admin');

route.get('/list', booking.list);

route.get('/refund/:id', booking.refund);

module.exports = route;
