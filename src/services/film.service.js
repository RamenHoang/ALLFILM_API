const { Op } = require('sequelize');
const { isNil } = require('lodash');
const {
  Film, Actor, Director, FilmType, Rating
} = require('../models');

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

FilmService.getById = async(id) => {
  const option = {
    where: { id },
    include: [
      { model: Actor, attributes: ['id', 'name'], through: { attributes: [] } },
      { model: Director, attributes: ['id', 'name'] },
      { model: FilmType, attributes: ['id', 'name'], through: { attributes: [] } }
    ]
  };

  return Film.findOne(option);
};

FilmService.rating = async(userId, id, point, film = null) => {
  if (isNil(film)) {
    film = await Film.findOne({ where: { id } });
  }
  point = parseInt(point, 10);
  const { rating, ratingTurn } = film;

  const ratingSum = rating * ratingTurn;
  const newRatingTurn = ratingTurn + 1;
  const newRating = parseFloat(((ratingSum + point) / newRatingTurn).toFixed(1));

  Rating.create({
    userId,
    filmId: id
  });

  return film.update({
    rating: newRating,
    ratingTurn: newRatingTurn
  });
};
