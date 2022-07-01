const { pick } = require('lodash');
const { BookingPayment } = require('../models');
const { BOOKING_PAYMENT } = require('../constants');

const BookingPaymentService = module.exports;

BookingPaymentService.createBookingPayment = async(bookingId, paymentPayload) => {
  paymentPayload = JSON.stringify(
    pick(
      paymentPayload,
      [
        'vnp_Amount',
        'vnp_BankCode',
        'vnp_BankTranNo',
        'vnp_CardType',
        'vnp_PayDate',
        'vnp_OrderInfo',
        'vnp_TransactionNo',
        'vnp_ResponseCode',
        'vnp_TransactionStatus',
        'vnp_TxnRef'
      ]
    )
  );

  return BookingPayment.create({
    bookingId,
    paymentPayload,
    status: BOOKING_PAYMENT.PAID
  });
};
