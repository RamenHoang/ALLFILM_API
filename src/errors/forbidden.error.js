
/**
 * Forbidden error.
 * @param {string} message Error message.
 * @param {array} errors List errors.
 */
function ForbiddenError(message, errors = []) {
  const instance = new Error(message);

  instance.name = 'ForbiddenError';
  instance.output = {
    code: 'FORBIDDEN',
    httpStatusCode: 403,
    errors
  };
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, ForbiddenError);
  }

  return instance;
}
ForbiddenError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
Object.setPrototypeOf(ForbiddenError, Error);

module.exports = ForbiddenError;
