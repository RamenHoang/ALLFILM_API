const winston = require('winston');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const adminAuth = require('../../middlewares/admin-auth');
const authRoute = require('./auth-route');
const userRoute = require('./user-route');
const filmRoute = require('./film-route');
const directorRoute = require('./director-route');
const actorRoute = require('./actor-route');
const foodDrinkRoute = require('./fooddrinks-route');
const cinemaRoute = require('./cinema-route');
const roomRoute = require('./room-route');
const sessionRoute = require('./session-route');
const promotionRoute = require('./promotion-route');
const bookingRoute = require('./booking-route');

function route(app) {
  const router = express.Router();

  // Top middlewares
  router.use(compression());
  router.use(cors());

  // Custom middlewares
  router.use('/', authRoute);
  router.use('/user/', adminAuth, userRoute);
  router.use('/films/', adminAuth, filmRoute);
  router.use('/directors/', adminAuth, directorRoute);
  router.use('/actors/', adminAuth, actorRoute);
  router.use('/fooddrinks/', adminAuth, foodDrinkRoute);
  router.use('/cinemas/', adminAuth, cinemaRoute);
  router.use('/rooms/', adminAuth, roomRoute);
  router.use('/sessions/', adminAuth, sessionRoute);
  router.use('/promotions/', adminAuth, promotionRoute);
  router.use('/bookings/', adminAuth, bookingRoute);

  app.use('/admin/', router);

  winston.info('Routes added');
}

module.exports = route;

