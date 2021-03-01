/**
 * Not found error.
 * @param {string} message Error message.
 * @param {array} errors List errors.
 */
function NotFoundError(message, errors = []) {
  const instance = new Error(message);

  instance.name = 'NotFoundError';
  instance.output = {
    code: 'OBJECT_NOT_FOUND',
    httpStatusCode: 404,
    errors
  };
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, NotFoundError);
  }

  return instance;
}
NotFoundError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
Object.setPrototypeOf(NotFoundError, Error);

module.exports = NotFoundError;
