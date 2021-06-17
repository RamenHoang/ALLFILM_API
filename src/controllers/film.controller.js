const _ = require('lodash');
const { filmService } = require('../services');
const { ok } = require('../helpers/response.helper');
const { NotFoundError, BadRequestError } = require('../errors');
const { filmMapper } = require('../mapper');
const { Rating } = require('../models');

const FilmController = module.exports;

FilmController.list = async(req, res, next) => {
  try {
    const q = _.get(req, 'query.q', '');
    const offset = _.toInteger(_.get(req, 'query.offset', 1));
    const limit = _.toInteger(_.get(req, 'query.limit', 6));
    const sortBy = _.get(req, 'query.sort_by', '-publish_date');

    const films = filmMapper.toListAtHomepage(await filmService.list({
      q,
      offset,
      limit,
      sortBy
    }));

    ok(req, res, films);
  } catch (e) {
    next(e);
  }
};

FilmController.getById = async(req, res, next) => {
  try {
    const id = _.get(req, 'params.id');

    const film = await filmService.getById(id);

    if (_.isNull(film)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'id',
          type: 'any.not_found',
          message: `id ${t('not_exist')}`
        }]
      );
    }

    ok(req, res, film);
  } catch (e) {
    next(e);
  }
};

FilmController.rating = async(req, res, next) => {
  try {
    const userId = _.get(req, 'currentUser.id');
    const id = _.get(req, 'params.id');
    const point = _.get(req, 'params.point');

    const userRateFilm = await Rating.findOne({
      where: {
        userId,
        filmId: id
      }
    });

    if (!_.isNil(userRateFilm)) {
      throw new BadRequestError(
        t('bad_request'),
        [{
          field: '',
          type: '',
          message: 'Người dùng đã đánh giá phim.'
        }]
      );
    }

    const film = await filmService.getById(id);

    if (_.isNull(film)) {
      throw new NotFoundError(
        t('not_found'),
        [{
          field: 'id',
          type: 'any.not_found',
          message: `id ${t('not_exist')}`
        }]
      );
    }

    const ratingStatus = await filmService.rating(userId, id, point, film);

    if (ratingStatus) {
      ok(req, res, {
        success: true,
        rating: ratingStatus.rating,
        ratingTurn: ratingStatus.ratingTurn
      });
    }
  } catch (e) {
    next(e);
  }
};
