const _ = require('lodash');

const { VALIDATE_ON } = require('../constants');
const { ValidationError } = require('../errors');

const translateField = (field) => t(_.replace(field, /\[\d*\]/g, ''));

const validate = (validation, data) => {
  const { error } = validation
    .options({ messages: getLocaleMessages() })
    .error((errs) => {
      errs = _.map(errs, (err) => {
        _.set(err, 'local.label', translateField(_.get(err, 'local.label', '')));
        _.set(err, 'local.peersWithLabels', _.map(_.get(err, 'local.peersWithLabels', []), translateField));

        return err;
      });

      return errs;
    })
    .validate(data, { abortEarly: false, allowUnknown: true });

  return error;
};

module.exports = (validators) => (async(req, res, next) => {
  let errors = [];

  await Promise.all(_.map(validators, async(validator) => {
    if (_.isFunction(validator)) {
      const error = await validator(req);

      if (error) {
        if (_.isArray(error)) errors = _.union(errors, error);
        else errors.push(error);
      }

      return;
    }

    _.each(_.values(VALIDATE_ON), (validateOn) => {
      const validation = _.get(validator, validateOn);

      if (!_.isEmpty(validation)) {
        const error = validate(validation, _.get(req, validateOn));

        if (error) {
          errors = _.concat(errors, _.map(error.details, (item) => ({
            field: _.join(item.path, '.'),
            ..._.pick(item, ['type', 'message'])
          })));
        }
      }
    });
  }));

  if (!_.isEmpty(errors)) return next(new ValidationError(null, errors));

  return next();
});
