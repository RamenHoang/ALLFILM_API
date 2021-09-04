const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { v4 } = require('uuid');

const mailConfig = require('../config/mail');
const appConfig = require('../config/app');
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

MailService.sendMail = (to, subject, html) => {
  const mailOptions = {
    from: `ALLFILM Cinema <${mailConfig.admin}>`,
    to,
    subject,
    html
  };

  return transport.sendMail(mailOptions);
};

MailService.sendMailActivateAccount = async(toEmail, token) => {
  const html = await ejs.renderFile(
    `${__dirname}/../../views/mail/activate_account.ejs`,
    {
      allfilmsDear: t('allfilms_dear'),
      message: t('mail_activate_message'),
      logo: `${appConfig.url}/assets/logo/ALLFILMS_500x500_black.png`,
      url: `${appConfig.url}/api/v1/auth/register/${token}`
    }
  );

  MailService.sendMail(
    toEmail,
    t('mail_activate_account_title'),
    html
  );
};

MailService.sendMailBookTicketSuccesfully = async(toEmail, ticketInfo) => {
  const html = await ejs.renderFile(
    `${__dirname}/../../views/mail/ticket.ejs`,
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
    t('mail_booking_success_title'),
    html
  );
};

MailService.sendMailPromotion = async(toEmail, promotion) => {
  const html = await ejs.renderFile(
    `${__dirname}/../../views/mail/promotion.ejs`,
    {
      logo: `${appConfig.url}/assets/logo/ALLFILMS_500x500_black.png`,
      promotion
    }
  );

  MailService.sendMail(
    toEmail,
    t('mail_new_promotion_title'),
    html
  );
};
