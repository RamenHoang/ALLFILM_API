const { get, isNil } = require('lodash');
const { actorService } = require('../services');
const { ok } = require('../helpers/response.helper');
const { NotFoundError } = require('../errors');

const ActorController = module.exports;

ActorController.getById = async(req, res, next) => {
  try {
    const id = get(req, 'params.id');

    const actor = await actorService.getById(id);

    if (isNil(actor)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'id',
          type: 'any.not_found',
          message: t('actor_not_found')
        }]
      );
    }

    ok(req, res, actor);
  } catch (e) {
    next(e);
  }
};
