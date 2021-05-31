const sha256 = require('sha256');
const querystring = require('qs');
const _ = require('lodash');
const dateFormat = require('dateformat');

const { NotFoundError } = require('../errors');
const { Booking } = require('../models');
const vnpayConfig = require('../config/vnpay');
const objectHelper = require('../helpers/object.helper');

const VNPayService = module.exports;

VNPayService.createPaymentUrl = async(bookingId, userId, ipAddress) => {
  const booking = await Booking.findOne({
    where: {
      id: bookingId,
      userId
    }
  });

  if (_.isNil(booking)) {
    throw new NotFoundError(
      t('not_found'),
      [{
        field: 'bookingId',
        type: 'any.not_found',
        message: 'Vé không tồn tại'
      }]
    );
  }

  const tmnCode = vnpayConfig.vnp_TmnCode;
  const secretKey = vnpayConfig.vnp_HashSecret;
  const returnUrl = vnpayConfig.vnp_ReturnUrl;
  let vnpUrl = vnpayConfig.vnp_Url;

  const date = new Date();
  const createDate = dateFormat(date, 'yyyymmddHHMMss');
  const orderId = `${bookingId}_${dateFormat(date, 'HHMMss')}`;
  const amount = booking.fee;
  const bankCode = '';
  const orderInfo = 'pay';
  const orderType = 'billpayment';
  const locale = 'vn';
  const currCode = 'VND';
  let vnpParams = {};

  vnpParams.vnp_Version = '2';
  vnpParams.vnp_Command = 'pay';
  vnpParams.vnp_TmnCode = tmnCode;
  vnpParams.vnp_Locale = locale;
  vnpParams.vnp_CurrCode = currCode;
  vnpParams.vnp_TxnRef = orderId;
  vnpParams.vnp_OrderInfo = orderInfo;
  vnpParams.vnp_OrderType = orderType;
  vnpParams.vnp_Amount = amount * 100;
  vnpParams.vnp_ReturnUrl = returnUrl;
  vnpParams.vnp_IpAddr = ipAddress;
  vnpParams.vnp_CreateDate = createDate;
  if (bankCode !== null && bankCode !== '') {
    vnpParams.vnp_BankCode = bankCode;
  }

  vnpParams = objectHelper.sortObject(vnpParams);

  const signData = secretKey + querystring.stringify(vnpParams, { encode: false });

  const secureHash = sha256(signData);

  vnpParams.vnp_SecureHashType = 'SHA256';
  vnpParams.vnp_SecureHash = secureHash;
  vnpUrl += `?${querystring.stringify(vnpParams, { encode: true })}`;

  return {
    code: '00',
    data: vnpUrl
  };
};
