const Joi = require('@hapi/joi');
const { VALIDATE_ON, REGEX } = require('../constants');

const AuthValidation = module.exports;

AuthValidation.validateLogin = {
  [VALIDATE_ON.BODY]: Joi.object({
    username: Joi.string().regex(REGEX.BOTH_USERNAME_EMAIL_ABSOLUTE_STRING).required(),
    password: Joi.string().regex(REGEX.PASSWORD).required()
  }),
};
