const _ = require('lodash');
const { Op } = require('sequelize');
const { NotFoundError, ValidationError } = require('../errors');
const {
  Booking,
  BookFoodDrink,
  Session,
  Cinema,
  Room,
  Film
} = require('../models');

const BookingService = module.exports;

function arrangeSeatOfSession(session, bookingSeats) {
  let emptySeatsInSession = session.emptySeats.split(',');
  const bookingSeatsArray = bookingSeats.split(',');

  emptySeatsInSession = emptySeatsInSession.filter((seat) => !bookingSeatsArray.includes(seat));

  session.bookedSeats += `,${bookingSeats}`;

  session.emptySeats = emptySeatsInSession.join(',');
}

function validateBookingSeats(bookedSeats, bookingSeats) {
  return bookedSeats.indexOf(bookingSeats) === -1;
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
              attributes: ['name', 'subName']
            }
          ]
        }
      ]
    });
  }

  throw new ValidationError('Các ghế chuẩn bị đặt đã được đặt trước. Vui lòng chọn ghế khác');
};

BookingService.checkout = async(userId, bookingId) => {
  const checkoutStatus = await Booking.update({
    checkedOutAt: Date.now()
  }, {
    where: {
      id: bookingId,
      userId
    }
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
        }
      ]
    });
  }

  throw new NotFoundError(
    t('not_found'),
    [{
      field: 'booking',
      type: 'any.not_found',
      message: 'Booking is not exist'
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
