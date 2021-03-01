const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const controllers = require('../controllers');
const apiRoutes = require('./api-route');
const authRoutes = require('./auth-route');

function addRoutes(app, router, middleware) {
  apiRoutes(router, middleware, controllers);
  authRoutes(router, middleware, controllers);
  app.use('/', router);
}

module.exports = async(app, middleware) => {
  const router = express.Router();

  router.use(compression());

  // Top middlewares
  router.use(cors());
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  // Routes
  addRoutes(app, router, middleware);
  winston.info('Routes added');
};
