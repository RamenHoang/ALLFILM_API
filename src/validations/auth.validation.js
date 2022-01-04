const Joi = require('@hapi/joi');
const _ = require('lodash');
const { VALIDATE_ON, REGEX } = require('../constants');
const { User } = require('../models');

const AuthValidation = module.exports;

AuthValidation.validateLogin = {
  [VALIDATE_ON.BODY]: Joi.object({
    username: Joi.string().regex(REGEX.USERNAME_ONLY).required().messages({
      'string.pattern.base': 'Vui lòng nhập mật khẩu chỉ chứa chữ và số, có độ dài tối đa 65  kí tự'
    }),
    password: Joi.string().regex(REGEX.PASSWORD).required().messages({
      'string.pattern.base': 'Vui lòng nhập mật khẩu chỉ chứa chữ và số, có độ dài từ 8 tới 64 kí tự'
    })
  }),
};

AuthValidation.validateRegister = {
  [VALIDATE_ON.BODY]: Joi.object({
    name: Joi.string().regex(REGEX.USERNAME_ONLY).required(),
    fullname: Joi.string().regex(REGEX.HUMAN_NAME).required(),
    phone: Joi.string().regex(REGEX.PHONE_NUMBER).required(),
    email: Joi.string().email().required().messages({
      'string.email': 'Vui lòng nhập email hợp lệ.'
    }),
    username: Joi.string().regex(REGEX.BOTH_USERNAME_EMAIL_ABSOLUTE_STRING).required(),
    password: Joi.string().regex(REGEX.PASSWORD).required().messages({
      'string.pattern.base': 'Vui lòng nhập mật khẩu chỉ chứa chữ và số, có độ dài từ 8 tới 64 kí tự'
    })
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
