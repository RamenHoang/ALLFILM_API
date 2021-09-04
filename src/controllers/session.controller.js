const { get, toInteger, } = require('lodash');
const { sessionService } = require('../services');
const { ok } = require('../helpers/response.helper');

const SessionController = module.exports;

SessionController.list = async(req, res, next) => {
  try {
    const cinemaId = get(req.query, 'cinemaId');
    const filmId = get(req.query, 'filmId');
    const date = get(req.query, 'date');
    const offset = toInteger(get(req, 'query.offset'));
    const limit = toInteger(get(req, 'query.limit'));
    const sortBy = get(req, 'query.sort_by', '+startTime');

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
