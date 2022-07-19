require('./src/i18n');
const express = require('express');
const winston = require('winston');
const async = require('async');
const path = require('path');
const flash = require('express-flash-messages');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const { accessTokenTTL, accessTokenSecret } = require('./src/config/oauth2');

const app = express();

const routes = require('./src/routes');
const adminRoutes = require('./src/routes/admin');
const ticketInspectorRoutes = require('./src/routes/ticket-inspector');
const { masterDB } = require('./src/database');
const errorHandler = require('./src/middlewares/error-handler');
const setupWinston = require('./winston-setup');
const job = require('./scheduler/removing-booking-15-minutes.schedule');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(`${__dirname}/public`));
app.use(session({
  secret: accessTokenSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: accessTokenTTL
  }
}));
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function addRoutes(callback) {
  routes(app);
  adminRoutes(app);
  ticketInspectorRoutes(app);
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

cron.schedule('*/3  * * * *', () => {
  job()
    .then((result) => {
      if (result === null) {
        winston.info('15 minutes job success');
      } else {
        winston.error(winston.error(result.message));
      }
    });
});

// Export your express server so you can import it in the lambda function.
module.exports = app;
