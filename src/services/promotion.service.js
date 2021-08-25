const {
  Promotion, PromotionSubscription
} = require('../models');

const PromotionService = module.exports;

PromotionService.getById = (id) => Promotion.findByPk(id);

PromotionService.list = (queryOption) => {
  const {
    offset,
    limit,
    sortBy
  } = queryOption;

  const option = {
    order: sortBy.split(',')
      .map((item) => [
        item.slice(1, item.length),
        item.slice(0, 1) === '*' ? 'ASC' : 'DESC'
      ]),
    offset: (offset - 1) * limit,
    limit
  };

  return Promotion.findAll(option);
};

PromotionService.subscribe = (email) => PromotionSubscription.create({ email });

PromotionService.findByEmail = (email) => PromotionSubscription.findOne({
  where: { email }
});
