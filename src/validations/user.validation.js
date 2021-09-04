const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const {
  VALIDATE_ON,
  REGEX
} = require('../constants');
const { User } = require('../models');

const UserValidation = module.exports;

UserValidation.validatePasswordSyntax = {
  [VALIDATE_ON.BODY]: Joi.object({
    currentPassword: Joi.string()
      .regex(REGEX.PASSWORD)
      .required(),
    confirmPassword: Joi.string()
      .regex(REGEX.PASSWORD)
      .required(),
    newPassword: Joi.string()
      .regex(REGEX.PASSWORD)
      .required()
  })
};

UserValidation.validatePasswordLogic = async(req) => {
  const {
    currentPassword,
    newPassword,
    confirmPassword
  } = req.body;

  if (currentPassword === newPassword) {
    return {
      field: 'user.currentPassword',
      type: 'any.not_existed',
      message: t('new_password_not_equal_current_password')
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      field: 'user.currentPassword',
      type: 'any.not_existed',
      message: t('new_password_not_equal_confirm_password')
    };
  }

  const userId = req.currentUser.id;
  const user = await User.findByPk(userId);
  const isMatchCurrentPassword = await bcrypt.compare(currentPassword, user.passwordHash);

  return isMatchCurrentPassword
    ? null
    : {
      field: 'user.currentPassword',
      type: 'any.not_existed',
      message: t('wrong_password')
    };
};

UserValidation.validateListBookingSyntax = {
  [VALIDATE_ON.QUERY]: Joi.object({
    fromDate: Joi.date().required(),
    toDate: Joi.date().greater(Joi.ref('fromDate')).required()
  })
};

UserValidation.validateNewProfile = {
  [VALIDATE_ON.BODY]: Joi.object({
    username: Joi.string().regex(REGEX.USERNAME_ONLY).required(),
    name: Joi.string().regex(REGEX.HUMAN_NAME).required(),
    phone: Joi.string().regex(REGEX.PHONE_NUMBER).required(),
    email: Joi.string().regex(REGEX.EMAIL_ONLY).required(),
    fullname: Joi.string().regex(REGEX.HUMAN_NAME).required()
  })
};
