const winston = require('winston');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const ticketInspectorAuth = require('../../middlewares/ticket-inspector-auth');
const authRoute = require('./auth-route');
const bookingRoute = require('./booking-route');

function route(app) {
  const router = express.Router();

  // Top middlewares
  router.use(compression());
  router.use(cors());

  // Custom middlewares
  router.use('/', authRoute);
  router.use('/bookings/', ticketInspectorAuth, bookingRoute);

  app.use('/ticket-inspector/', router);

  winston.info('Routes added');
}

module.exports = route;

