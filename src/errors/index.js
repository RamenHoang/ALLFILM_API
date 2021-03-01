const ValidationError = require('./validation.error');
const NotFoundError = require('./not-found.error');
const BadRequestError = require('./bad-request.error');
const UnauthorizedError = require('./unauthorized.error');
const ForbiddenError = require('./forbidden.error');
const TimeoutError = require('./timeout.error');
const InternalServerError = require('./internal-server.error');

module.exports = {
  ValidationError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  TimeoutError,
  InternalServerError
};
