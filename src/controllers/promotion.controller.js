const { isNil, get, toInteger } = require('lodash');
const {
  ValidationError,
  NotFoundError
} = require('../errors');
const { promotionService } = require('../services');
const { ok } = require('../helpers/response.helper');

const PromotionController = module.exports;

PromotionController.getById = async(req, res, next) => {
  try {
    const id = get(req, 'params.id');

    const promotion = await promotionService.getById(id);

    if (isNil(promotion)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'any',
          type: 'any.not_found',
          message: t('promotion_not_found')
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
    const offset = toInteger(get(req, 'query.offset', 1));
    const limit = toInteger(get(req, 'query.limit', 25));
    const sortBy = get(req, 'query.sort_by', '-updatedAt');

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
    const email = get(req, 'body.email');

    if (isNil(email)) {
      throw new ValidationError(
        t('validation'),
        [{
          field: 'id',
          type: 'any.null',
          message: t('email_not_null')
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
          message: t('email_subscribed')
        }]
      );
    }

    const subscriptionStatus = await promotionService.subscribe(email);

    ok(req, res, { status: !!subscriptionStatus });
  } catch (e) {
    next(e);
  }
};
