/**
 * Timeout error.
 * @param {string} message Error message.
 * @param {array} errors List errors.
 */
function TimeoutError(message, errors = []) {
  const instance = new Error(message);

  instance.name = 'TimeoutError';
  instance.output = {
    code: 'TIMEOUT',
    httpStatusCode: 503,
    errors
  };
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, TimeoutError);
  }

  return instance;
}
TimeoutError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
Object.setPrototypeOf(TimeoutError, Error);

module.exports = TimeoutError;
