require('dotenv').config();

module.exports = {
  host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.MAIL_PORT || 2525,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
  admin: process.env.MAIL_ADMIN
};
