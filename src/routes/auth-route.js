const express = require('express');
const validate = require('../validations/validate');
const { AuthValidation } = require('../validations');
const authController = require('../controllers/auth.controller');

const route = express.Router();

route.post(
  '/login',
  validate([AuthValidation.validateLogin]),
  authController.login
);

route.post(
  '/register',
  validate([
    AuthValidation.validateRegister,
    AuthValidation.validateUniqueUsername
  ]),
  authController.register
);

route.get('/register/:token', authController.activateAccount);

// route.post("/register",authController.register);

module.exports = route;
