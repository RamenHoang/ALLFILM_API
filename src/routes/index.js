const winston = require('winston');
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const authRoute = require('./auth-route');
const filmRoute = require('./film-route');
const actorRoute = require('./actor-route');
const directorRoute = require('./director-route');

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

  app.use('/api/v1/', router);

  winston.info('Routes added');
}

module.exports = route;

