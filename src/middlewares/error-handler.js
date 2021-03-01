const winston = require('winston');
const { error } = require('../helpers/response.helper');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  winston.error(err);

  return error(req, res, err);
};
