const express = require('express');

const route = express.Router();
const validate = require('../validations/validate');
const { UserValidation } = require('../validations');
const auth = require('../middlewares/auth');
const { user } = require('../controllers');

route.get('/:id(\\d+)', auth, user.getById);

route.get('/profile', auth, user.getProfile);

route.get('', auth, user.list);

route.put('/:id', auth, user.updateProfile);

route.put('/profile', auth, user.updateProfile);

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

route.post('', auth, user.createUser);

module.exports = route;
