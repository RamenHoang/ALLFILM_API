const winston = require('winston');
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const authRoute = require('./auth-route');
const filmRoute = require('./film-route');

function route(app) {
  const router = express.Router();

  router.use(compression());

  // Top middlewares
  router.use(cors());

  router.use('/auth/', authRoute);
  router.use('/film/', filmRoute);

  app.use('/api/v1/', router);
  winston.info('Routes added');
}

module.exports = route;

