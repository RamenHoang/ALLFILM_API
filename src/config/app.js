require('dotenv').config();

module.exports = {
  port: process.env.APP_PORT || 5000,
  host: process.env.APP_HOST || 'localhost',
  locale: 'en',
  logLevel: process.env.LOG_LEVEL || 'debug',
  url: process.env.APP_URL || 'localhost:5000',
  env: process.env.APP_ENV || 'local',
  saltRound: +process.env.SALT_ROUND || 10
};
