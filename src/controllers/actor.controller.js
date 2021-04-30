const _ = require('lodash');
const { actorService } = require('../services');
const { ok } = require('../helpers/response.helper');
const { NotFoundError, ValidationError } = require('../errors');

const ActorController = module.exports;

ActorController.getById = async(req, res, next) => {
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

    const actor = await actorService.getById(id);

    if (_.isNil(actor)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'id',
          type: 'any.not_found',
          message: `Actor with "${id}" is not found`
        }]
      );
    }

    ok(req, res, actor);
  } catch (e) {
    next(e);
  }
};
