const _ = require('lodash');
const {
  Booking, BookFoodDrink, Session, Cinema, Room, Film
} = require('../models');

const BookingService = module.exports;

BookingService.bookTicket = async(userId, bookingOption) => {
  const newBooking = await Booking.create({
    userId,
    ..._.pick(bookingOption, ['bookingTime', 'keepingTime', 'seats', 'fee', 'sessionId', 'sessionRoomId'])
  });

  const sessionToUpdate = await Session.findByPk(bookingOption.sessionId);

  sessionToUpdate.bookedSeats += `,${bookingOption.seats}`;
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
};
