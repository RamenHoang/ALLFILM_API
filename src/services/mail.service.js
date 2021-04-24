const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail');
const { NotFoundError } = require('../errors');

const transport = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass
  }
});

const MailService = module.exports;

MailService.sendMail = (to, subject = 'Hi there', html = '<h1>Hi there</h1>') => {
  if (!to) {
    throw new NotFoundError(t('not_found'),
      [{
        field: 'to',
        type: 'any.not_found',
        message: '"to" does not exist'
      }]);
  }

  const mailOptions = {
    from: mailConfig.admin,
    to,
    subject,
    html
  };

  return transport.sendMail(mailOptions);
};
