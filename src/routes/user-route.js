const express = require('express');

const route = express.Router();
const validate = require('../validations/validate');
const { UserValidation } = require('../validations');
const auth = require('../middlewares/auth');
const { user } = require('../controllers');

route.get('/:id(\\d+)', auth, user.getById);

route.get('/profile', auth, user.getProfile);

route.get('', auth, user.list);

route.put(
  '/profile',
  auth,
  validate([UserValidation.validateNewProfile]),
  user.updateProfile
);

route.put(
  '/profile/password',
  auth,
  validate([
    UserValidation.validatePasswordSyntax,
    UserValidation.validatePasswordLogic
  ]),
  user.updatePassword
);

route.get(
  '/profile/booking',
  auth,
  validate([UserValidation.validateListBookingSyntax]),
  user.listBooking
);

module.exports = route;
