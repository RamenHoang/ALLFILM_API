const express = require('express');

const route = express.Router();
const { booking } = require('../controllers');
const auth = require('../middlewares/auth');

route.post('', auth, booking.bookTicket);

route.post('/checkout/:bookingId', auth, booking.checkoutTicket);

route.get('/ipn', booking.getIpn);

route.get('/return-url', booking.getReturn);

route.get('/remove', booking.remove);

route.get('/:bookingId/close', booking.closeTicket);

module.exports = route;
