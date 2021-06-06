const _ = require('lodash');
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
  FoodDrink
} = require('../models');

const BookingService = module.exports;

function arrangeSeatOfSession(session, bookingSeats, type = 'add') {
  let emptySeatsInSession = session.emptySeats.split(',');
  let bookedSeatsInSession = session.bookedSeats.split(',');
  const bookingSeatsArray = bookingSeats.split(',');

  if (type === 'add') {
    emptySeatsInSession = emptySeatsInSession.filter((seat) => !bookingSeatsArray.includes(seat));

    session.bookedSeats += `,${bookingSeats}`;

    session.emptySeats = emptySeatsInSession.join(',');
  } else if (type === 'remove') {
    bookedSeatsInSession = bookedSeatsInSession.filter((seat) => !bookingSeatsArray.includes(seat));

    session.emptySeats += `,${bookingSeats}`;

    session.bookedSeats = bookedSeatsInSession.join(',');
  }
}

function validateBookingSeats(bookedSeats, bookingSeats) {
  return bookedSeats.indexOf(bookingSeats) === -1;
}

async function clearBookingAndItsRelationshipWithTransaction(sessionId, bookings, transaction) {
  const session = await Session.findByPk(sessionId);
  const promises = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const booking of bookings) {
    arrangeSeatOfSession(session, booking.seats, 'remove');

    promises.push(BookFoodDrink.destroy({
      where: {
        bookingId: booking.id
      }
    }, { transaction }));

    promises.push(Booking.destroy({
      where: {
        id: booking.id
      }
    }, { transaction }));

    promises.push(session.save({ transaction }));
  }

  return Promise.all(promises);
}

BookingService.bookTicket = async(userId, bookingOption) => {
  const newBooking = await Booking.create({
    userId,
    ..._.pick(bookingOption, ['bookingTime', 'keepingTime', 'seats', 'fee', 'sessionId', 'sessionRoomId'])
  });

  const sessionToUpdate = await Session.findByPk(bookingOption.sessionId);

  const canBookSeats = validateBookingSeats(sessionToUpdate.bookedSeats, bookingOption.seats);

  if (canBookSeats) {
    arrangeSeatOfSession(sessionToUpdate, bookingOption.seats);

    // sessionToUpdate.bookedSeats += `,${bookingOption.seats}`;
    await sessionToUpdate.save();

    const rawBookFoodDrinkRecord = _.map(bookingOption.foodDrinks, (item) => ({
      bookingId: newBooking.id,
      bookingUserId: userId,
      foodDrinkId: item.id,
      count: item.count
    }));

    await BookFoodDrink.bulkCreate(rawBookFoodDrinkRecord);

    return Booking.findByPk(newBooking.id, {
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
    });
  }

  throw new ValidationError(
    t('validation_error'),
    [{
      field: 'seats',
      type: 'any.duplicated',
      message: 'Các ghế chuẩn bị đặt đã được đặt trước. Vui lòng chọn ghế khác'
    }]
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

  if (checkoutStatus[0]) {
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
  }

  throw new NotFoundError(
    t('not_found'),
    [{
      field: 'booking',
      type: 'any.not_found',
      message: 'Vé không tồn tại'
    }]
  );
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
      }
    ],
    attributes: ['fee', 'seats']
  };

  if (_.isObject(dateOption)) {
    queryOption.where.checkedOutAt = {
      [Op.between]: [
        dateOption.fromDate,
        dateOption.toDate
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
            [Op.lte]: dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')
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

      // eslint-disable-next-line no-restricted-syntax
      for (const sessionId in bookingGroupBySession) {
        if (!_.isNil(bookingGroupBySession[`${sessionId}`])) {
          const bookingInSession = bookingGroupBySession[`${sessionId}`];

          promises.push(
            clearBookingAndItsRelationshipWithTransaction(sessionId, bookingInSession, t)
          );
        }
      }

      await Promise.all(promises);
    });

    return null;
  } catch (e) {
    return e;
  }
};

