const sha256 = require('sha256');
const querystring = require('qs');
const _ = require('lodash');
const dateFormat = require('dateformat');

const { NotFoundError } = require('../errors');
const { Booking, BookingPayment } = require('../models');
const vnpayConfig = require('../config/vnpay');
const objectHelper = require('../helpers/object.helper');
const httpHeler = require('../helpers/http.helper');
const { BOOKING_PAYMENT, VNPAY_ERROR_CODE } = require('../constants');

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

VNPayService.makeRequestRefund = async(bookingId, ipAddress) => {
  const booking = await Booking.findOne({
    where: {
      id: bookingId
    },
    include: {
      model: BookingPayment,
      where: {
        status: BOOKING_PAYMENT.PAID
      }
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

  const paymentPayload = JSON.parse(booking.BookingPayments[0].paymentPayload);

  const date = new Date();
  const createDate = dateFormat(date, 'yyyymmddHHMMss');
  let vnpParams = {};

  vnpParams.vnp_Version = '2';
  vnpParams.vnp_Command = 'refund';
  vnpParams.vnp_TmnCode = vnpayConfig.vnp_TmnCode;
  vnpParams.vnp_TransactionType = '02';
  vnpParams.vnp_TxnRef = paymentPayload.vnp_TxnRef;
  vnpParams.vnp_Amount = booking.fee * 100;
  vnpParams.vnp_OrderInfo = 'refund';
  vnpParams.vnp_TransDate = dateFormat(booking.checkedOutAt, 'yyyymmddHHMMss');
  vnpParams.vnp_TransactionNo = paymentPayload.vnp_TransactionNo;
  vnpParams.vnp_CreateBy = vnpayConfig.vnp_MerchantUser;
  vnpParams.vnp_CreateDate = createDate;
  vnpParams.vnp_IpAddr = ipAddress;
  vnpParams = objectHelper.sortObject(vnpParams);

  const signData = vnpayConfig.vnp_HashSecret + querystring.stringify(vnpParams, { encode: false });

  vnpParams.vnp_SecureHashType = 'SHA256';
  vnpParams.vnp_SecureHash = sha256(signData);

  const vpnRefundUrl = `${vnpayConfig.vnp_RefundUrl}?${querystring.stringify(vnpParams, { encode: true })}`;

  const response = await httpHeler.get(vpnRefundUrl);
  const refundPayload = querystring.parse(response.data);

  if (refundPayload.vnp_ResponseCode === VNPAY_ERROR_CODE['00']) {
    return true;
  }

  return false;
};
