const winston = require('winston');
const { ok } = require('../helpers/response.helper');
const { name, version } = require('../../package.json');

const APIController = module.exports;

APIController.status = async(req, res) => {
  winston.debug('API status');

  return ok(req, res, { name, version });
};
