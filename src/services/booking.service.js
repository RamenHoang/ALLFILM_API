const {
  pick, map, isObject, isNil
} = require('lodash');
const { Op } = require('sequelize');
const dateFormat = require('dateformat');

const { NotFoundError, ValidationError } = require('../errors');
const {
  Booking,
  BookFoodDrink,
  Session,
  Cinema,
  Room,
  Film,
  User,
  masterDB,
  FoodDrink,
  BookingPayment
} = require('../models');
const {
  BOOKING_PAYMENT
} = require('../constants');
const datetimeHelper = require('../helpers/datetime.helper');

const BookingService = module.exports;

function arrangeSeatOfSession(session, bookingSeats, type = 'add') {
  let emptySeatsInSession = isNil(session.emptySeats) ? [] : session.emptySeats.split(',');
  let bookedSeatsInSession = isNil(session.bookedSeats) ? [] : session.bookedSeats.split(',');
  const bookingSeatsArray = bookingSeats.split(',');

  switch (type) {
    case 'add':
      emptySeatsInSession = emptySeatsInSession.filter((seat) => !bookingSeatsArray.includes(seat));
      session.bookedSeats += `,${bookingSeats}`;
      session.emptySeats = emptySeatsInSession.join(',');
      break;
    case 'remove':
      bookedSeatsInSession = bookedSeatsInSession.filter((seat) => !bookingSeatsArray.includes(seat));
      session.emptySeats += `,${bookingSeats}`;
      session.bookedSeats = bookedSeatsInSession.join(',');
      break;
    default:
      break;
  }
}

function validateBookingSeats(bookedSeats, bookingSeats) {
  return bookedSeats.indexOf(bookingSeats) === -1;
}

async function clearBookingAndItsRelationshipWithTransaction(sessionId, bookings, transaction) {
  const session = await Session.findByPk(sessionId);
  const promises = [];
  const bookingIdToRemove = [];

  bookings.forEach((booking) => {
    arrangeSeatOfSession(session, booking.seats, 'remove');
    bookingIdToRemove.push(booking.id);
  });

  promises.push(BookFoodDrink.destroy({
    where: {
      bookingId: {
        [Op.in]: bookingIdToRemove
      }
    }
  }, { transaction }));

  promises.push(Booking.destroy({
    where: {
      id: {
        [Op.in]: bookingIdToRemove
      }
    }
  }, { transaction }));

  promises.push(Session.update(
    { emptySeats: session.emptySeats, bookedSeats: session.bookedSeats },
    { where: { id: session.id } },
    { transaction }
  ));

  return Promise.all(promises);
}

async function returnSeatsForSession(sessionId, booking, transaction) {
  const session = await Session.findByPk(sessionId);

  arrangeSeatOfSession(session, booking.seats, 'remove');

  return Session.update(
    {
      emptySeats: session.emptySeats,
      bookedSeats: session.bookedSeats
    },
    { where: { id: session.id } },
    { transaction }
  );
}

BookingService.bookTicket = async(userId, bookingOption) => {
  let bookingId = null;

  await masterDB.transaction(async(t) => {
    const newBooking = await Booking.create(
      {
        userId,
        ...pick(
          bookingOption,
          [
            'bookingTime', 'keepingTime', 'seats', 'fee', 'sessionId', 'sessionRoomId'
          ]
        )
      }, {
        transaction: t
      }
    );

    const sessionToUpdate = await Session.findByPk(bookingOption.sessionId);

    const canBookSeats = isNil(sessionToUpdate.bookedSeats)
      ? true
      : validateBookingSeats(sessionToUpdate.bookedSeats, bookingOption.seats);

    if (!canBookSeats) {
      throw new ValidationError(
        t('validation_error'),
        [{
          field: 'seats',
          type: 'any.duplicated',
          message: t('seats_is_booked')
        }]
      );
    }

    arrangeSeatOfSession(sessionToUpdate, bookingOption.seats);

    await sessionToUpdate.save({ transaction: t });

    const rawBookFoodDrinkRecord = map(
      bookingOption.foodDrinks,
      (item) => ({
        bookingId: newBooking.id,
        bookingUserId: userId,
        foodDrinkId: item.id,
        count: item.count
      })
    );

    await BookFoodDrink.bulkCreate(
      rawBookFoodDrinkRecord,
      {
        transaction: t
      }
    );

    await BookingPayment.create(
      {
        bookingId: newBooking.id,
        paymentPayload: null,
        status: BOOKING_PAYMENT.NOT_PAID
      },
      {
        transaction: t
      }
    );

    bookingId = newBooking.id;
  });

  return Booking.findByPk(
    bookingId,
    {
      include: [
        {
          model: Session,
          attributes: ['startTime', 'price'],
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
              attributes: ['name', 'subName']
            }
          ]
        },
        {
          model: FoodDrink,
          attributes: ['name', 'price'],
          through: {
            attributes: ['count']
          }
        }
      ]
    }
  );
};

BookingService.checkout = async(bookingId, payDate) => {
  const checkoutStatus = await Booking.update({
    checkedOutAt: payDate
  }, {
    where: {
      id: bookingId
    },
    raw: true,
    nest: true
  });

  if (!checkoutStatus[0]) {
    throw new NotFoundError(
      t('not_found'),
      [{
        field: 'booking',
        type: 'any.not_found',
        message: t('ticket_not_exist')
      }]
    );
  }

  return Booking.findByPk(bookingId, {
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
        model: User,
        attributes: ['email']
      },
      {
        model: FoodDrink,
        attributes: ['name', 'price'],
        through: {
          attributes: ['count']
        }
      }
    ]
  });
};

BookingService.listByUserAndDate = (userId, dateOption) => {
  const queryOption = {
    where: {
      userId
    },
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
    attributes: ['fee', 'seats']
  };

  if (isObject(dateOption)) {
    queryOption.where.createdAt = {
      [Op.between]: [
        datetimeHelper.startOfDate(dateOption.fromDate),
        datetimeHelper.endOfDate(dateOption.toDate)
      ]
    };
  }

  return Booking.findAll(queryOption);
};

BookingService.removeAfterFifteen = async() => {
  try {
    await masterDB.transaction(async(t) => {
      const promises = [];

      const bookingToRemove = await Booking.findAll({
        where: {
          checkedOutAt: null,
          keepingTime: {
            [Op.lte]: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
          }
        },
        attributes: ['id', 'sessionId', 'seats'],
        raw: true
      });

      const bookingGroupBySession = bookingToRemove.reduce((accumulator, booking) => {
        accumulator[booking.sessionId] = accumulator[booking.sessionId] || [];
        accumulator[booking.sessionId].push({
          id: booking.id,
          seats: booking.seats
        });

        return accumulator;
      }, {});

      Object.keys(bookingGroupBySession).forEach((sessionId) => {
        if (!isNil(bookingGroupBySession[`${sessionId}`])) {
          const bookingInSession = bookingGroupBySession[`${sessionId}`];

          promises.concat(clearBookingAndItsRelationshipWithTransaction(
            sessionId,
            bookingInSession,
            t
          ));
        }
      });

      await Promise.all(promises);
    });

    return null;
  } catch (e) {
    return e;
  }
};

BookingService.returnPurchasedSeats = async(bookingId) => {
  try {
    let processStatus = false;

    await masterDB.transaction(async(t) => {
      const booking = await Booking.findAll({
        where: {
          id: bookingId
        },
        attributes: ['id', 'sessionId', 'seats'],
        raw: true
      });

      if (isNil(booking)) {
        throw new Error();
      }

      const returnSeatsStatus = await returnSeatsForSession(booking.sessionId, booking, t);

      if (isNil(returnSeatsStatus)) {
        throw new Error();
      }

      const bookingPaymentResolvedRefund = await BookingPayment.create(
        {
          bookingId,
          status: BOOKING_PAYMENT.RESOVLED_REFUND
        },
        {
          transaction: t
        }
      );

      if (isNil(bookingPaymentResolvedRefund)) {
        throw new Error();
      }

      processStatus = true;
    });

    return processStatus;
  } catch (e) {
    return e;
  }
};
