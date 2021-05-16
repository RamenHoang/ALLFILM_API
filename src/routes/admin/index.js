const winston = require('winston');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const adminAuth = require('../../middlewares/admin-auth');
const authRoute = require('./auth-route');
const userRoute = require('./user-route');
const filmRoute = require('./film-route');
const directorRoute = require('./director-route');

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

  app.use('/admin/', router);

  winston.info('Routes added');
}

module.exports = route;

