const { get, isNil } = require('lodash');
const sha256 = require('sha256');
const querystring = require('qs');

const {
  bookingService,
  mailService,
  vnpayService,
  bookingPaymentService
} = require('../services');
const { ok } = require('../helpers/response.helper');
const objectHelper = require('../helpers/object.helper');
const vnpayConfig = require('../config/vnpay');
const { frontEndUrl } = require('../config/app');
const { VNPAY_ERROR_CODE, REFUND_STATUES } = require('../constants');
const { bookingMapper } = require('../mapper');
const { Booking, BookingRefund } = require('../models');
const { NotFoundError, BadRequestError } = require('../errors');

// const { NotFoundError, ValidationError } = require('../errors');

const BookingController = module.exports;

BookingController.bookTicket = async(req, res, next) => {
  try {
    const userId = get(req.currentUser, 'id');
    const bookingTime = get(req.body, 'bookingTime');
    const keepingTime = get(req.body, 'keepingTime');
    const seats = get(req.body, 'seats');
    const fee = get(req.body, 'fee');
    const sessionId = get(req.body, 'sessionId');
    const sessionRoomId = get(req.body, 'sessionRoomId');
    const foodDrinks = get(req.body, 'foodDrinks');

    const ticket = bookingMapper.toBooking(await bookingService.bookTicket(userId, {
      bookingTime,
      keepingTime,
      seats,
      fee,
      sessionId,
      sessionRoomId,
      foodDrinks
    }));

    ok(req, res, ticket);
  } catch (e) {
    next(e);
  }
};

BookingController.checkoutTicket = async(req, res, next) => {
  try {
    const bookingId = get(req.params, 'bookingId');
    const userId = get(req.currentUser, 'id');
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

BookingController.refundTicket = async(req, res, next) => {
  try {
    const bookingId = get(req.params, 'bookingId');

    const booking = await Booking.findOne({
      where: { id: bookingId },
      include: {
        model: BookingRefund,
        required: false
      }
    });

    if (isNil(booking)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'bookingId',
          type: 'any.not_found',
          message: t('ticket_not_exist')
        }]
      );
    }

    if (!isNil(booking.BookingRefunds)) {
      throw new BadRequestError(
        t('bad_request'),
        [{
          field: 'bookingId',
          type: 'any.failed',
          message: t('ticket_is_requested_for_refund')
        }]
      );
    }

    const requestRefundResult = await BookingRefund.create({
      bookingId,
      refundStatus: REFUND_STATUES.REQUESTED
    });

    ok(req, res, requestRefundResult);
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
      const checkedOutBookingInfo = bookingMapper.toBookingWithUser(
        await bookingService.checkout(
          bookingId,
          vnpParams
            .vnp_PayDate
            .replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6')
        )
      );

      bookingPaymentService.createBookingPayment(bookingId, vnpParams);

      mailService.sendMailBookTicketSuccesfully(
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
      res.render('vnpay/transaction_status', {
        code: '00',
        message: VNPAY_ERROR_CODE['00'],
        frontEndUrl
      });
    } else {
      res.render('vnpay/transaction_status', {
        code: vnpayResponseCode,
        message: VNPAY_ERROR_CODE[vnpayResponseCode],
        frontEndUrl
      });
    }
  } catch (e) {
    next(e);
  }
};

BookingController.remove = async(req, res, next) => {
  try {
    const result = await bookingService.removeAfterFifteen();

    ok(req, res, result);
  } catch (e) {
    next(e);
  }
};

BookingController.closeTicket = async(req, res, next) => {
  try {
    const { bookingId } = req.params;
    const ticket = await Booking.findByPk(bookingId);

    if (isNil(ticket)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'bookingId',
          type: 'any.not_found',
          message: t('ticket_not_exist')
        }]
      );
    }

    if (ticket.isClose === true) {
      throw new BadRequestError(
        t('bad_request'),
        [
          {
            field: 'booking',
            type: 'bad_request',
            message: t('ticket_is_used')
          }
        ]
      );
    }

    Booking.update({
      isClose: true
    }, {
      where: {
        id: bookingId
      }
    });

    ok(req, res, { message: t('valid_ticket_and_wish_client') });
  } catch (e) {
    next(e);
  }
};
