const { get, isNil, toInteger } = require('lodash');
const { NotFoundError } = require('../errors');
const { userService, bookingService } = require('../services');
const { ok } = require('../helpers/response.helper');

const UserController = module.exports;

UserController.getById = async(req, res, next) => {
  try {
    const id = get(req, 'params.id');

    const user = await userService.getById(id);

    if (isNil(user)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'any',
          type: 'any.not_found',
          message: t('user_not_found')
        }]
      );
    }

    ok(req, res, user);
  } catch (e) {
    next(e);
  }
};

UserController.getProfile = async(req, res, next) => {
  try {
    const userId = get(req, 'currentUser.id');

    const userProfile = await userService.getById(userId);

    ok(req, res, userProfile);
  } catch (e) {
    next(e);
  }
};

UserController.list = async(req, res, next) => {
  try {
    const q = get(req, 'query.q', '');
    const offset = toInteger(get(req, 'query.offset', 1));
    const limit = toInteger(get(req, 'query.limit', 25));
    const sortBy = get(req, 'query.sort_by', '-updatedAt');

    const users = await userService.list({
      q,
      offset,
      limit,
      sortBy
    });

    ok(req, res, users);
  } catch (e) {
    next(e);
  }
};

UserController.updateProfile = async(req, res, next) => {
  try {
    const id = get(req, 'currentUser.id');
    const newProfile = get(req, 'body');
    const updateStatus = await userService.updateProfile(id, newProfile);

    if (!updateStatus[0]) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'any',
          type: 'any.not_found',
          message: t('update_profile_failure')
        }]
      );
    }

    ok(req, res, { success: true });
  } catch (e) {
    next(e);
  }
};

UserController.updatePassword = async(req, res, next) => {
  try {
    const userId = req.currentUser.id;
    const { newPassword } = req.body;

    const updatePasswordStatus = await userService.updatePassword(userId, newPassword);

    ok(req, res, { success: updatePasswordStatus[0] === 1 });
  } catch (e) {
    next(e);
  }
};

UserController.listBooking = async(req, res, next) => {
  try {
    const userId = req.currentUser.id;
    const { fromDate, toDate } = req.query;

    const bookings = await bookingService.listByUserAndDate(userId, { fromDate, toDate });

    ok(req, res, bookings);
  } catch (e) {
    next(e);
  }
};
