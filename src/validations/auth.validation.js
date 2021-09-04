const Joi = require('@hapi/joi');
const _ = require('lodash');
const { VALIDATE_ON, REGEX } = require('../constants');
const { User } = require('../models');

const AuthValidation = module.exports;

AuthValidation.validateLogin = {
  [VALIDATE_ON.BODY]: Joi.object({
    username: Joi.string().regex(REGEX.BOTH_USERNAME_EMAIL_ABSOLUTE_STRING).required(),
    password: Joi.string().regex(REGEX.PASSWORD).required()
  }),
};

AuthValidation.validateRegister = {
  [VALIDATE_ON.BODY]: Joi.object({
    name: Joi.string().required(),
    fullname: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().regex(REGEX.BOTH_USERNAME_EMAIL_ABSOLUTE_STRING).required(),
    password: Joi.string().regex(REGEX.PASSWORD).required()
  })
};

AuthValidation.validateEmail = {
  [VALIDATE_ON.BODY]: Joi.object({
    email: Joi.string().regex(REGEX.EMAIL_ONLY)
  })
};

AuthValidation.validateUniqueUsername = async(req) => {
  const username = _.get(req, 'body.username');

  const userByUsername = await User.findOne({
    where: { username },
    attributes: ['id']
  });

  return !userByUsername
    ? null
    : { field: 'user.username', type: 'any.existed', message: t('username_existed') };
};

AuthValidation.validateToken = {
  [VALIDATE_ON.PARAMS]: Joi.object({
    token: Joi.string().regex(REGEX.ACTIVATION_TOKEN)
  })
};
