const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail');
const appConfig = require('../config/app');
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

MailService.sendMailBookTicketSuccesfully = (toEmail, ticketInfo) => {
  const html = `
    <div style="width: 500px; max-width: 100%; margin: auto">
      <h1>Chúc mừng! Bạn đã đặt vé thành công!</h1>
      <img style="width: 100%" src="${ticketInfo.Session.Film.poster}">
      <h2 style="width: 100%; text-align: center">${ticketInfo.Session.Film.subName}</h2>
      <h3 style="width: 100%; text-align: center">${ticketInfo.Session.Film.name}</h3>
      <div style="width: 100%; text-align: center">Vé(${(() => ticketInfo.seats.split(',').length)()}) (Ghế ${ticketInfo.seats})
      ${ticketInfo.Session.Room.name} Chi nhánh ${ticketInfo.Session.Cinema.name} - ${ticketInfo.Session.Cinema.address}</div>
      <br>
      <table style="width: 100%">
        <tr>
          <th>Ngày:</th>
          <th>Thời gian:</th>
          <th>Rạp:</th>
        </tr>
        <tr>
          <th>${ticketInfo.Session.startTime.split(' ')[0]}</th>
          <th>${ticketInfo.Session.startTime.split(' ')[1]}</th>
          <th>${ticketInfo.Session.Room.name}</th>
      </tr>
      </table>
    </div>
    `;

  MailService.sendMail(
    toEmail,
    'Chúc mừng bạn đặt vé thành công',
    html
  );
};
