const express = require('express');
const { booking } = require('../../controllers/ticket-inpector');

const route = express.Router();

route.get('/:id', booking.getBooking);

route.post('/', booking.verifyTicket);

module.exports = route;
