const _ = require('lodash');
const {
  ValidationError,
  NotFoundError
} = require('../errors');
const { promotionService } = require('../services');
const { ok } = require('../helpers/response.helper');

const PromotionController = module.exports;

PromotionController.getById = async(req, res, next) => {
  try {
    const id = _.get(req, 'params.id');

    if (_.isNil(id)) {
      throw new ValidationError(
        t('validation'),
        [{
          field: 'id',
          type: 'any.null',
          message: '"id" is null'
        }]
      );
    }

    const promotion = await promotionService.getById(id);

    if (_.isNil(promotion)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'any',
          type: 'any.not_found',
          message: 'Promotion not found'
        }]
      );
    }

    ok(req, res, promotion);
  } catch (e) {
    next(e);
  }
};

PromotionController.list = async(req, res, next) => {
  try {
    const offset = _.toInteger(_.get(req, 'query.offset', 1));
    const limit = _.toInteger(_.get(req, 'query.limit', 25));
    const sortBy = _.get(req, 'query.sort_by', '-updatedAt');

    const promotions = await promotionService.list({
      offset,
      limit,
      sortBy
    });

    ok(req, res, promotions);
  } catch (e) {
    next(e);
  }
};

PromotionController.subscribe = async(req, res, next) => {
  try {
    const email = _.get(req, 'body.email');

    if (_.isNil(email)) {
      throw new ValidationError(
        t('validation'),
        [{
          field: 'id',
          type: 'any.null',
          message: '"email" is null'
        }]
      );
    }

    const subscription = await promotionService.findByEmail(email);

    if (subscription) {
      throw new ValidationError(
        t('validation'),
        [{
          field: 'email',
          type: 'any.null',
          message: '"email" is subcribed'
        }]
      );
    }

    const subscriptionStatus = await promotionService.subscribe(email);

    ok(req, res, { status: !!subscriptionStatus });
  } catch (e) {
    next(e);
  }
};
