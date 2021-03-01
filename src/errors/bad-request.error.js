/**
 * Bad request error.
 * @param {string} message Error message.
 * @param {array} errors List errors.
 */
function BadRequestError(message, errors = []) {
  const instance = new Error(message);

  instance.name = 'BadRequestError';
  instance.output = {
    code: 'BAD_REQUEST',
    httpStatusCode: 400,
    errors
  };
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, BadRequestError);
  }

  return instance;
}
BadRequestError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
Object.setPrototypeOf(BadRequestError, Error);

module.exports = BadRequestError;
