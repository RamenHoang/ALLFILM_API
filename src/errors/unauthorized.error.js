
/**
 * Unauthorized error.
 * @param {string} message Error message.
 * @param {array} errors List errors.
 */
function UnauthorizedError(message, errors = []) {
  const instance = new Error(message);

  instance.name = 'UnauthorizedError';
  instance.output = {
    code: 'UNAUTHORIZED_ACCESS',
    httpStatusCode: 401,
    errors
  };
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, UnauthorizedError);
  }

  return instance;
}
UnauthorizedError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
Object.setPrototypeOf(UnauthorizedError, Error);

module.exports = UnauthorizedError;
