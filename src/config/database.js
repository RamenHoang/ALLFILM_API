require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'db_main',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || '3306',
  timeZone: process.env.TIME_ZONE || '+07:00'
};
