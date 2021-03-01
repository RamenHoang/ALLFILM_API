const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, Role } = require('../models');
const { REGEX } = require('../constants');
const { NotFoundError } = require('../errors');
const jwtHelper = require('../helpers/jwt.helper');

const AuthService = module.exports;

AuthService.login = async(username, password) => {
  const option = {
    where: {},
    include: {
      model: Role,
      through: {
        attributes: []
      },
      attributes: ['permition', 'entity']
    },
    attributes: ['id', 'passwordHash']
  };

  if (username.match(REGEX.USERNAME_ONLY)) {
    option.where = { username };
  }

  if (username.match(REGEX.EMAIL_ONLY)) {
    option.where = { email: username };
  }

  let user = await User.findOne(option);

  if (_.isNil(user)) {
    throw new NotFoundError(
      t('not_found'),
      [{
        field: 'username',
        type: 'any.not_found',
        message: '"username" does not exist'
      }]
    );
  }

  user = user.get({ plain: true });

  if (!bcrypt.compareSync(password, user.passwordHash)) {
    throw new NotFoundError(
      t('not_found'),
      [{
        field: 'password',
        type: 'any.not_found',
        message: '"password" does not exist'
      }]
    );
  }

  const payload = _.pick(user, ['id', 'Roles']);

  return {
    access_token: jwtHelper.generateAccessToken(payload),
    refresh_token: jwtHelper.generateRefreshToken(payload)
  };
};
