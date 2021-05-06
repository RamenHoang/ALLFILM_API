const _ = require('lodash');
const { bookingService } = require('../services');
const { ok } = require('../helpers/response.helper');
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
