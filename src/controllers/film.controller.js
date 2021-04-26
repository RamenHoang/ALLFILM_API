const _ = require('lodash');
const { filmService } = require('../services');
const { ok } = require('../helpers/response.helper');
const { filmMapper } = require('../mapper');

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
