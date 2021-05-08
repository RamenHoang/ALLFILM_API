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
      message: 'Mật khẩu mới và mật khẩu cũ đã trùng nhau'
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      message: 'Mật khẩu mới và mật khẩu nhập lại không trùng khớp'
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
      message: 'Mật khẩu hiện tại không chính xác'
    };
};

UserValidation.validateListBookingSyntax = {
  [VALIDATE_ON.QUERY]: Joi.object({
    fromDate: Joi.date().required(),
    toDate: Joi.date().greater(Joi.ref('fromDate')).required()
  })
};
