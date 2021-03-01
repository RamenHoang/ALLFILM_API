const _ = require('lodash');
const { authService } = require('../services');
const { ok } = require('../helpers/response.helper');

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
