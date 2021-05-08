const _ = require('lodash');
const {
  ValidationError,
  NotFoundError
} = require('../errors');
const { userService, bookingService } = require('../services');
const { ok } = require('../helpers/response.helper');

const UserController = module.exports;

UserController.getById = async(req, res, next) => {
  try {
    const id = _.get(req, 'params.id');

    if (_.isNil(id)) {
      throw new ValidationError(
        t('validation'),
        [{
          field: 'id',
          type: 'any.null',
          message: '"id" is null'
        }]
      );
    }

    const user = await userService.getById(id);

    if (_.isNil(user)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'any',
          type: 'any.not_found',
          message: 'User not found'
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
    const userId = _.get(req, 'currentUser.id');

    const userProfile = await userService.getById(userId);

    ok(req, res, userProfile);
  } catch (e) {
    next(e);
  }
};

UserController.list = async(req, res, next) => {
  try {
    const q = _.get(req, 'query.q', '');
    const offset = _.toInteger(_.get(req, 'query.offset', 1));
    const limit = _.toInteger(_.get(req, 'query.limit', 25));
    const sortBy = _.get(req, 'query.sort_by', '-updatedAt');

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
    const id = _.get(req, 'currentUser.id');
    const newProfile = _.get(req, 'body');

    if (_.isNil(id) || _.isNil(newProfile)) {
      throw new ValidationError(
        t('validation'),
        [{
          field: 'id',
          type: 'any.null',
          message: '"id" is null'
        }]
      );
    }

    const updateStatus = await userService.updateProfile(id, newProfile);

    if (!updateStatus[0]) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'any',
          type: 'any.not_found',
          message: 'User not found'
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

UserController.createUser = async(req, res, next) => {
  try {
    const userInfo = _.get(req, 'body.userInfo');
    const userRole = _.get(req, 'body.userRole');

    if (_.isNil(userInfo)) {
      throw new ValidationError(
        t('validation'),
        [{
          field: 'user info',
          type: 'any.null',
          message: '"user info" is null'
        }]
      );
    }

    const newUser = await userService.createUser(userInfo, userRole);

    ok(req, res, newUser);
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
