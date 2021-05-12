const winston = require('winston');
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const adminAuth = require('../../middlewares/admin-auth');
const authRoute = require('./auth-route');
const userRoute = require('./user-route');

function route(app) {
  const router = express.Router();

  // Top middlewares
  router.use(compression());
  router.use(cors());

  // Custom middlewares
  router.use('/', authRoute);
  router.use('/user/', adminAuth, userRoute);

  app.use('/admin/', router);

  winston.info('Routes added');
}

module.exports = route;

