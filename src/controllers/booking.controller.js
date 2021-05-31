const _ = require('lodash');
const sha256 = require('sha256');
const querystring = require('qs');

const {
  bookingService,
  mailService,
  vnpayService
} = require('../services');
const { ok } = require('../helpers/response.helper');
const objectHelper = require('../helpers/object.helper');
const vnpayConfig = require('../config/vnpay');
const { VNPAY_ERROR_CODE } = require('../constants');

// const { NotFoundError, ValidationError } = require('../errors');

const BookingController = module.exports;

BookingController.bookTicket = async(req, res, next) => {
  try {
    const userId = _.get(req.currentUser, 'id');
    const bookingTime = _.get(req.body, 'bookingTime');
    const keepingTime = _.get(req.body, 'keepingTime');
    const seats = _.get(req.body, 'seats');
    const fee = _.get(req.body, 'fee');
    const sessionId = _.get(req.body, 'sessionId');
    const sessionRoomId = _.get(req.body, 'sessionRoomId');
    const foodDrinks = _.get(req.body, 'foodDrinks');

    const ticket = await bookingService.bookTicket(userId, {
      bookingTime,
      keepingTime,
      seats,
      fee,
      sessionId,
      sessionRoomId,
      foodDrinks
    });

    ok(req, res, ticket);
  } catch (e) {
    next(e);
  }
};

BookingController.checkoutTicket = async(req, res, next) => {
  try {
    const bookingId = _.get(req.params, 'bookingId');
    const userId = _.get(req.currentUser, 'id');
    const ipAddress = req.headers['x-forwarded-for']
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || req.connection.socket.remoteAddress;

    const result = await vnpayService.createPaymentUrl(bookingId, userId, ipAddress);

    ok(req, res, result);
  } catch (e) {
    next(e);
  }
};

BookingController.getIpn = async(req, res, next) => {
  try {
    let vnpParams = req.query;
    const secureHash = vnpParams.vnp_SecureHash;

    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;

    vnpParams = objectHelper.sortObject(vnpParams);

    const secretKey = vnpayConfig.vnp_HashSecret;
    const signData = secretKey + querystring.stringify(vnpParams, { encode: false });

    const checkSum = sha256(signData);

    const vnpayResponseCode = vnpParams.vnp_ResponseCode;

    if (secureHash === checkSum && vnpayResponseCode === '00') {
      const bookingId = vnpParams.vnp_TxnRef.split('_')[0];
      // const rspCode = vnpParams.vnp_ResponseCode;

      const checkedOutBookingInfo = await bookingService.checkout(
        bookingId,
        vnpParams
          .vnp_PayDate
          .replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6')
      );

      await mailService.sendMailBookTicketSuccesfully(
        checkedOutBookingInfo.User.email,
        checkedOutBookingInfo
      );

      res.status(200).json({
        RspCode: '00',
        Message: VNPAY_ERROR_CODE['00']
      });
    } else {
      res.status(200).json({
        RspCode: vnpayResponseCode,
        Message: VNPAY_ERROR_CODE[vnpayResponseCode]
      });
    }
  } catch (e) {
    next(e);
  }
};

BookingController.getReturn = async(req, res, next) => {
  try {
    let vnpParams = req.query;
    const secureHash = vnpParams.vnp_SecureHash;

    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;

    vnpParams = objectHelper.sortObject(vnpParams);

    const secretKey = vnpayConfig.vnp_HashSecret;
    const signData = secretKey + querystring.stringify(vnpParams, { encode: false });
    const checkSum = sha256(signData);
    const vnpayResponseCode = vnpParams.vnp_ResponseCode;

    if (secureHash === checkSum && vnpayResponseCode === '00') {
      const bookingId = vnpParams.vnp_TxnRef.split('_')[0];
      // const rspCode = vnpParams.vnp_ResponseCode;

      const checkedOutBookingInfo = await bookingService.checkout(
        bookingId,
        vnpParams
          .vnp_PayDate
          .replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6')
      );

      await mailService.sendMailBookTicketSuccesfully(
        checkedOutBookingInfo.User.email,
        checkedOutBookingInfo
      );

      res.render('vnpay/transaction_status', {
        code: '00',
        message: VNPAY_ERROR_CODE['00']
      });
    } else {
      res.render('vnpay/transaction_status', {
        code: vnpayResponseCode,
        message: VNPAY_ERROR_CODE[vnpayResponseCode]
      });
    }
  } catch (e) {
    next(e);
  }
};
