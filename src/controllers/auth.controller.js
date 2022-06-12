const { get } = require('lodash');
const { authService, mailService } = require('../services');
const { ok } = require('../helpers/response.helper');
const { BadRequestError } = require('../errors');
const { frontEndUrl } = require('../config/app');

const AuthController = module.exports;

AuthController.login = async(req, res, next) => {
  try {
    const username = get(req, 'body.username');
    const password = get(req, 'body.password');
    const result = await authService.login(username, password);

    ok(req, res, result);
  } catch (e) {
    next(e);
  }
};

AuthController.register = async(req, res, next) => {
  try {
    const registerItem = {
      name: get(req, 'body.name'),
      fullname: get(req, 'body.fullname'),
      phone: get(req, 'body.phone'),
      email: get(req, 'body.email'),
      username: get(req, 'body.username'),
      password: get(req, 'body.password')
    };

    const registerResult = await authService.register(registerItem);

    if (registerResult) {
      mailService.sendMailActivateAccount(registerItem.email, registerResult.verifyingToken);

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
    const verifyingToken = get(req, 'params.token');
    const activatingResult = await authService.activateAccount(verifyingToken);
    const dataToRender = {
      activateAccountPageTitle: t('activate_account_page_title'),
      activateAccountMessage: '',
      activationAccountComeHome: t('activate_account_come_home'),
      frontEndUrl
    };

    if (activatingResult) {
      dataToRender.activateAccountMessage = t('activate_account_success');
    } else {
      dataToRender.activateAccountMessage = t('activate_account_failure');
    }

    res.render('activate_account_info.ejs', dataToRender);
  } catch (e) {
    next(e);
  }
};
