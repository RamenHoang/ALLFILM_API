const _ = require('lodash');
const { directorService } = require('../services');
const { ok } = require('../helpers/response.helper');
const { NotFoundError, ValidationError } = require('../errors');

const DirectorService = module.exports;

DirectorService.getById = async(req, res, next) => {
  try {
    const id = _.get(req, 'params.id');

    if (_.isNil(id)) {
      throw new ValidationError(
        t('validation_error'),
        [{
          field: 'id',
          type: 'any.null',
          message: '"id" is null'
        }]
      );
    }

    const actor = await directorService.getById(id);

    if (_.isNil(actor)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'id',
          type: 'any.not_found',
          message: `Director with "${id}" is not found`
        }]
      );
    }

    ok(req, res, actor);
  } catch (e) {
    next(e);
  }
};
