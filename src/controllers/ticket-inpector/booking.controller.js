const { isNil } = require('lodash');
const _ = require('lodash');
const { Op } = require('sequelize');
const { BOOKING_PAYMENT } = require('../../constants');
const datetimeHelper = require('../../helpers/datetime.helper');

const {
  Room,
  Cinema,
  Session,
  Film,
  Booking,
  BookingPayment
} = require('../../models');

const {
  vnpayService, bookingService
} = require('../../services');

const BookingController = module.exports;

const controller = 'bookings';

BookingController.verifyTicket = async(req, res) => {
  try {
    const loginUser = req.currentUser;
    const action = 'list';
    const errorData = {};

    if (req.method === 'POST') {
      const bookingId = req.body.booking_id;

      const booking = await Booking.findOne(
        {
          where: {
            id: bookingId,
            isClose: false
          },
          include: [
            {
              model: Session,
              attributes: ['startTime'],
              where: {
                startTime: {
                  [Op.gte]: datetimeHelper.now()
                }
              }
            }
          ]
        }
      );

      if (isNil(booking)) {
        req.flash('error', 'Vé đã được sử dụng hoặc đã quá hạn');
        res.redirect('/ticket-inspector/verify-booking');

        return;
      }

      const result = await Booking.update(
        {
          isClose: true
        },
        {
          where: {
            id: bookingId
          }
        },
      );

      if (isNil(result[0])) {
        req.flash('error', 'Có lỗi xảy ra trong quá trình xác minh vé');
        res.redirect('/ticket-inspector/verify-booking');

        return;
      }

      req.flash('success', 'Xác minh vé thành công');
      res.redirect('/ticket-inspector/verify-booking');

      return;
    }

    res.render(
      'ticket-inspector/verify-booking',
      {
        page_title: 'Admin - Dashboard',
        loginUser,
        controller,
        action,
        errorData,
      }
    );
  } catch (e) {
    console.error(e);
  }
};

BookingController.getBooking = async(req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findOne(
      {
        where: {
          id: bookingId,
        },
        include: [
          {
            model: Session,
            attributes: ['startTime'],
            include: [
              {
                model: Cinema,
                attributes: ['name']
              },
              {
                model: Room,
                attributes: ['name']
              },
              {
                model: Film,
                attributes: ['name']
              }
            ]
          }
        ]
      }
    );

    console.log(booking);

    res.status(200).json(booking);
  } catch (e) {
    console.error(e);
  }
};

BookingController.refund = async(req, res) => {
  try {
    const bookingId = req.params.id;

    const bookingPaymentRequestedRefund = await BookingPayment.findOne(
      {
        where: {
          bookingId,
          status: BOOKING_PAYMENT.REQUESTED_REFUND
        }
      }
    );

    if (_.isNil(bookingPaymentRequestedRefund)) {
      req.flash('error', 'Người mua chưa tạo yêu cầu hủy vé này');
      res.redirect(`/ticket-inspector/${controller}/list`);

      return;
    }

    const bookingPaymentResolvedRefund = await BookingPayment.findOne(
      {
        where: {
          bookingId,
          status: BOOKING_PAYMENT.RESOVLED_REFUND
        }
      }
    );

    if (bookingPaymentResolvedRefund) {
      req.flash('error', 'Vé này đã được hủy và hoàn tiền cho người mua');
      res.redirect(`/ticket-inspector/${controller}/list`);

      return;
    }

    const ipAddress = req.headers['x-forwarded-for']
      || req.connection.remoteAddress
      || req.socket.remoteAddress
      || req.connection.socket.remoteAddress;

    const refundPayload = await vnpayService.makeRequestRefund(bookingId, ipAddress);

    if (!refundPayload) {
      req.flash('error', 'Có lỗi xảy ra trong quá trình hoàn tiền');
      res.redirect(`/ticket-inspector/${controller}/list`);

      return;
    }

    const newBookingPaymentResolvedRefund = await BookingPayment.create(
      {
        bookingId,
        status: BOOKING_PAYMENT.RESOVLED_REFUND,
        paymentPayload: JSON.stringify(refundPayload)
      }
    );

    if (isNil(newBookingPaymentResolvedRefund)) {
      req.flash('error', 'Có lỗi xảy ra trong quá trình tạo mục hoàn tiền thành công');
      res.redirect(`/ticket-inspector/${controller}/list`);

      return;
    }

    const returnSeatsStatus = await bookingService.returnPurchasedSeats(bookingId);

    if (isNil(returnSeatsStatus)) {
      req.flash('error', 'Có lỗi xảy ra trong quá trình hoàn trả ghế');
      res.redirect(`/ticket-inspector/${controller}/list`);

      return;
    }

    req.flash('success', 'Vé đã được hoàn tiền thành công, ghế đã được hoàn trả thành công');
    res.redirect(`/ticket-inspector/${controller}/list`);
  } catch (e) {
    console.error(e);
  }
};
