const { PAGINATION } = require('../constants');

const PaginationHelper = module.exports;

PaginationHelper.build = (req, items, total) => {
  const limit = req.query.limit || PAGINATION.DEFAULT_LIMIT;
  const offset = req.query.offset || PAGINATION.DEFAULT_OFFSET;

  return {
    items,
    pagination: { total, limit, offset }
  };
};
