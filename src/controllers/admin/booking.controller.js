const { isNil } = require('lodash');
const _ = require('lodash');
const { BOOKING_PAYMENT } = require('../../constants');

const {
  Room,
  Cinema,
  Session,
  Film,
  Booking,
  FoodDrink,
  BookingPayment
} = require('../../models');

const {
  vnpayService, bookingService
} = require('../../services');

const BookingController = module.exports;

const controller = 'bookings';

BookingController.list = async(req, res) => {
  try {
    const loginUser = req.currentUser;
    const queryOption = {
      include: [
        {
          model: Session,
          attributes: ['startTime'],
          include: [
            {
              model: Cinema,
              attributes: ['name', 'address']
            },
            {
              model: Room,
              attributes: ['name']
            },
            {
              model: Film,
              attributes: ['name', 'subName', 'poster']
            }
          ]
        },
        {
          model: FoodDrink,
          through: {
            attributes: ['count']
          }
        },
        {
          model: BookingPayment
        }
      ],
      attributes: ['id', 'fee', 'seats', 'createdAt'],
      order: [
        ['createdAt', 'DESC']
      ]
    };

    // if (isObject(dateOption)) {
    //   queryOption.where.checkedOutAt = {
    //     [Op.between]: [
    //       dateOption.fromDate,
    //       dateOption.toDate
    //     ]
    //   };
    // }

    const bookings = await Booking.findAll(queryOption);
    const action = 'list';
    const errorData = {};

    res.render('admin/bookings/list', {
      page_title: 'Admin - Dashboard',
      data: bookings,
      loginUser,
      controller,
      action,
      errorData,
    });
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
      res.redirect(`/admin/${controller}/list`);

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
      res.redirect(`/admin/${controller}/list`);

      return;
    }

    const ipAddress = req.headers['x-forwarded-for']
      || req.connection.remoteAddress
      || req.socket.remoteAddress
      || req.connection.socket.remoteAddress;

    const refundPayload = await vnpayService.makeRequestRefund(bookingId, ipAddress);

    if (!refundPayload) {
      req.flash('error', 'Có lỗi xảy ra trong quá trình hoàn tiền');
      res.redirect(`/admin/${controller}/list`);

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
      res.redirect(`/admin/${controller}/list`);

      return;
    }

    const returnSeatsStatus = await bookingService.returnPurchasedSeats(bookingId);

    if (isNil(returnSeatsStatus)) {
      req.flash('error', 'Có lỗi xảy ra trong quá trình hoàn trả ghế');
      res.redirect(`/admin/${controller}/list`);

      return;
    }

    req.flash('success', 'Vé đã được hoàn tiền thành công, ghế đã được hoàn trả thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
  }
};
