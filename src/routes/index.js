const winston = require('winston');
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const authRoute = require('./auth-route');
const filmRoute = require('./film-route');
const actorRoute = require('./actor-route');
const directorRoute = require('./director-route');
const userRoute = require('./user-route');
const sessionRoute = require('./session-route');
const bookingRoute = require('./booking-route');
const foodDrinkRoute = require('./food-drink-route');
const cinemaRoute = require('./cinema-route');
const promotionRoute = require('./promotion-route');
const apiDocsRoute = require('./apidocs-route');

function route(app) {
  const router = express.Router();

  // Top middlewares
  router.use(compression());
  router.use(cors());

  // Custom middlewares
  router.use('/auth/', authRoute);
  router.use('/film/', filmRoute);
  router.use('/actor/', actorRoute);
  router.use('/director/', directorRoute);
  router.use('/user/', userRoute);
  router.use('/session/', sessionRoute);
  router.use('/booking/', bookingRoute);
  router.use('/food-drink/', foodDrinkRoute);
  router.use('/cinema/', cinemaRoute);
  router.use('/promotion/', promotionRoute);

  app.use('/api/v1/', router);
  app.use('/api/docs', apiDocsRoute);

  winston.info('Routes added');
}

module.exports = route;

