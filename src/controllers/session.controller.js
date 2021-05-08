const _ = require('lodash');
const { sessionService } = require('../services');
const { ok } = require('../helpers/response.helper');
// const { NotFoundError } = require('../errors');

const SessionController = module.exports;

SessionController.list = async(req, res, next) => {
  try {
    const cinemaId = _.get(req.query, 'cinemaId');
    const filmId = _.get(req.query, 'filmId');
    const date = _.get(req.query, 'date');
    const offset = _.toInteger(_.get(req, 'query.offset'));
    const limit = _.toInteger(_.get(req, 'query.limit'));
    const sortBy = _.get(req, 'query.sort_by', '+startTime');

    const sessions = await sessionService.list({
      cinemaId,
      filmId,
      date,
      offset,
      limit,
      sortBy
    });

    ok(req, res, sessions);
  } catch (e) {
    next(e);
  }
};

SessionController.getById = async(req, res, next) => {
  try {
    const sessionId = req.params.id;

    const sessionInfo = await sessionService.getById(sessionId);

    ok(req, res, sessionInfo);
  } catch (e) {
    next(e);
  }
};
