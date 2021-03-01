/**
 * Validation error.
 * @param {string} message Error message.
 * @param {array} errors List errors.
 */
function ValidationError(message = null, errors = []) {
  const instance = new Error(message);

  instance.name = 'ValidationError';
  instance.message = t('invalid_parameter');

  instance.output = {
    code: 'INVALID_PARAMETER',
    httpStatusCode: 400,
    errors: Object.values(errors)
  };

  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, ValidationError);
  }

  return instance;
}
ValidationError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
Object.setPrototypeOf(ValidationError, Error);

module.exports = ValidationError;
