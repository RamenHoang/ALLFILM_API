const _ = require('lodash');
const { authService, mailService } = require('../services');
const { ok, error } = require('../helpers/response.helper');
const { BadRequestError } = require('../errors');
const appConfig = require('../config/app');

const AuthController = module.exports;

AuthController.login = async(req, res, next) => {
  try {
    const username = _.get(req, 'body.username');
    const password = _.get(req, 'body.password');
    const result = await authService.login(username, password);

    ok(req, res, result);
  } catch (e) {
    next(e);
  }
};

AuthController.register = async(req, res, next) => {
  try {
    const registerItem = {
      name: _.get(req, 'body.name'),
      fullname: _.get(req, 'body.fullname'),
      phone: _.get(req, 'body.phone'),
      email: _.get(req, 'body.email'),
      username: _.get(req, 'body.username'),
      password: _.get(req, 'body.password')
    };

    const registerResult = await authService.register(registerItem);

    if (registerResult) {
      // Send activation mail
      const html = `
        <h1>${t('allfilm_welcome')}</h1>
        <h2>${t('click_to_active_account')} <a href="http://${appConfig.url}/api/v1/auth/register/${registerResult.verifyingToken}">Activation</a></h2>
      `;

      mailService.sendMail(
        registerItem.email,
        t('active_account_subject'),
        html
      );

      ok(req, res, t('successful_register'));
    } else {
      throw new BadRequestError(t('bad_request'));
    }
  } catch (e) {
    next(e);
  }
};

AuthController.activateAccount = async(req, res, next) => {
  try {
    const verifyingToken = _.get(req, 'params.token');
    const activatingResult = await authService.activateAccount(verifyingToken);

    if (activatingResult) {
      ok(req, res, t('successful_activation'));
    }

    throw new BadRequestError(t('bad_request'), [{
      field: t('account'),
      type: 'any.activated',
      message: t('account_activated')
    }]);
  } catch (e) {
    next(e);
  }
};
