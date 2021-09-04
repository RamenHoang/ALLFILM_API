const _ = require('lodash');
const { directorService } = require('../services');
const { ok } = require('../helpers/response.helper');
const { NotFoundError } = require('../errors');

const DirectorController = module.exports;

DirectorController.getById = async(req, res, next) => {
  try {
    const id = _.get(req, 'params.id');

    const actor = await directorService.getById(id);

    if (_.isNil(actor)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'id',
          type: 'any.not_found',
          message: t('director_not_found')
        }]
      );
    }

    ok(req, res, actor);
  } catch (e) {
    next(e);
  }
};
