const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const authRoute = require('./auth-route');

function route(app){
  const router = express.Router();

  router.use(compression());

  // Top middlewares
  router.use(cors());
  
  app.use('/auth',authRoute);
  winston.info('Routes added');
}

module.exports = route;

