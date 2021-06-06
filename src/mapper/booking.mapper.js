const _ = require('lodash');

const BookingMapper = module.exports;

function calculateMoneyAndAmountFoodDrink(foodDrinks) {
  if (_.isArray(foodDrinks) && foodDrinks.length > 0) {
    return _.map(foodDrinks, (foodDrink) => ({
      name: foodDrink.name,
      price: foodDrink.price,
      amount: foodDrink.BookFoodDrink.count
    }));
  }

  return [];
}

BookingMapper.toBooking = (bookingSequelize) => ({
  ..._.pick(
    bookingSequelize,
    [
      'id',
      'bookingTime',
      'keepingTime',
      'fee',
      'seats',
      'userId',
      'sessionId',
      'sessionRoomId',
      'qrCode',
      'checkedOutAt',
      'createdAt',
      'updatedAt',
      'Session'
    ]
  ),
  FoodDrinks: calculateMoneyAndAmountFoodDrink(bookingSequelize.FoodDrinks)
});

BookingMapper.toBookingWithUser = (bookingSequelize) => ({
  ...BookingMapper.toBooking(bookingSequelize),
  User: bookingSequelize.User
});
