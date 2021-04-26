const { Op } = require('sequelize');
const { Film } = require('../models');

const FilmService = module.exports;

FilmService.list = (queryOption) => {
  const {
    q,
    offset,
    limit,
    sortBy
  } = queryOption;
  const option = {
    where: {
      [Op.or]: {
        name: { [Op.like]: `%${q}%` },
        subName: { [Op.like]: `%${q}%` },
      }
    },
    order: sortBy.split(',')
      .map((item) => [
        item.slice(1, item.length),
        item.slice(0, 1) === '*' ? 'ASC' : 'DESC'
      ]),
    offset: (offset - 1) * limit,
    limit
  };

  return Film.findAll(option);
};
