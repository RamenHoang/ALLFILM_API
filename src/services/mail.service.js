const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { v4 } = require('uuid');

const mailConfig = require('../config/mail');
const appConfig = require('../config/app');
const { NotFoundError } = require('../errors');
const qrHelper = require('../helpers/qr.helper');

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
    from: `ALLFILM Cinema <${mailConfig.admin}>`,
    to,
    subject,
    html
  };

  return transport.sendMail(mailOptions);
};

MailService.sendMailActivateAccount = (toEmail, token) => {
  const html = `
        <h1>ALLFILM Cinema xin chào quý khách</h1>
        <h2>Để xác minh đây là bạn, vui lòng nhấp link bên để <a href="http://${appConfig.url}/api/v1/auth/register/${token}">kích hoạt tài khoản</a></h2>
      `;

  MailService.sendMail(
    toEmail,
    'Kích hoạt tài khoản',
    html
  );
};

MailService.sendMailBookTicketSuccesfully = async(toEmail, ticketInfo) => {
  const html = await ejs.renderFile(
    `${__dirname}/../../views/ticket/ticket.ejs`,
    {
      logo: `${appConfig.url}/assets/logo/ALLFILMS_500x500_black.png`,
      ticketInfo,
      foodDrinks: ticketInfo.FoodDrinks.reduce((acc, item) => {
        acc += `${item.name} x ${item.amount}; `;

        return acc;
      }, ''),
      qrCode: await qrHelper.toFile(
        `${__dirname}/../../public/qr/${v4()}.png`,
        `${appConfig.url}/api/v1/booking/${ticketInfo.id}/close`
      )
    }
  );

  MailService.sendMail(
    toEmail,
    'Chúc mừng bạn đặt vé thành công',
    html
  );
};
