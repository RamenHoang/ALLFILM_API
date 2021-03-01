/**
 * Internal service error.
 * @param {string} message Error message.
 * @param {array} errors List errors.
 */
function InternalServerError(message, errors = []) {
  const instance = new Error(message);

  instance.name = 'InternalServerError';
  instance.output = {
    code: 'INTERNAL_SERVER_ERROR',
    httpStatusCode: 500,
    errors
  };
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, InternalServerError);
  }

  return instance;
}
InternalServerError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
Object.setPrototypeOf(InternalServerError, Error);

module.exports = InternalServerError;
