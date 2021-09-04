const { isNil, pick } = require('lodash');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { User, Role, UserRole } = require('../models');
const { REGEX, ROLES } = require('../constants');
const { NotFoundError, BadRequestError } = require('../errors');
const { saltRound } = require('../config/app');
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
    attributes: ['id', 'passwordHash', 'registerVerifyingToken']
  };

  if (username.match(REGEX.USERNAME_ONLY)) {
    option.where = { username };
  }

  if (username.match(REGEX.EMAIL_ONLY)) {
    option.where = { email: username };
  }

  const user = await User.findOne(option);

  if (isNil(user)) {
    throw new NotFoundError(
      t('not_found'),
      [{
        field: 'username',
        type: 'any.not_found',
        message: t('wrong_username')
      }]
    );
  }

  if (!isNil(user.registerVerifyingToken)) {
    throw new BadRequestError(
      t('bad_request'),
      [{
        field: 'account',
        type: 'any.not_active',
        message: t('account_inactive')
      }]
    );
  }

  if (!bcrypt.compareSync(password, user.passwordHash)) {
    throw new NotFoundError(
      t('not_found'),
      [{
        field: 'password',
        type: 'any.not_found',
        message: t('wrong_pasword')
      }]
    );
  }

  const payload = pick(user, ['id', 'Roles']);

  return {
    access_token: jwtHelper.generateAccessToken(payload),
    refresh_token: jwtHelper.generateRefreshToken(payload)
  };
};

AuthService.register = async(registerItem) => {
  const passwordHash = await bcrypt.hash(registerItem.password, saltRound);
  const verifyingToken = uuid.v4();
  const newUserItem = {
    ...pick(registerItem, ['name', 'username', 'fullname', 'phone', 'email']),
    passwordHash,
    registerVerifyingToken: verifyingToken
  };

  const newUser = await User.create(newUserItem);

  return newUser ? { verifyingToken, email: registerItem.email } : null;
};

AuthService.activateAccount = async(token) => {
  const inactivatedAccount = await User.findOne({
    where: {
      registerVerifyingToken: token
    }
  });

  if (!inactivatedAccount) {
    return false;
  }

  inactivatedAccount.update({
    registerVerifyingToken: null
  });

  const clientRole = await Role.findOne({
    where: {
      name: ROLES.CLIENT
    },
    attributes: ['id'],
    raw: true
  });

  UserRole.create({
    user_id: inactivatedAccount.id,
    role_id: clientRole.id
  });

  return true;
};
