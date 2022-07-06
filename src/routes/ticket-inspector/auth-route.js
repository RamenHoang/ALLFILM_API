const express = require('express');
const { auth, booking } = require('../../controllers/ticket-inpector');
const ticketInspectorAuth = require('../../middlewares/ticket-inspector-auth');

const route = express.Router();

route.get('/login', auth.login);

route.post('/login', auth.login);

route.get('/verify-booking', ticketInspectorAuth, booking.verifyTicket);

route.get('/logout', ticketInspectorAuth, auth.logout);

module.exports = route;
