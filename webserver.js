require('./src/i18n');
const express = require('express');
const winston = require('winston');
const async = require('async');
const path = require('path');
const flash = require('express-flash-messages');

const app = express();
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const adminRoutes = require('./src/routes/admin');
const { masterDB } = require('./src/database');
const errorHandler = require('./src/middlewares/error-handler');
const setupWinston = require('./winston-setup');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/public`));
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function addRoutes(callback) {
  routes(app);
  adminRoutes(app);
  app.use(errorHandler);
  callback();
}

function start() {
  async.waterfall(
    [
      (next) => masterDB.init(next),
      (next) => addRoutes(next)
    ],
    (err) => {
      if (err) {
        winston.error(err);
        // Either way, bad stuff happened. Abort start.
        process.exit();
      }
    }
  );
}

setupWinston();

start();

// Export your express server so you can import it in the lambda function.
module.exports = app;
