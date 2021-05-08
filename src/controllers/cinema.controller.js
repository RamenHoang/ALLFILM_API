const { cinemaService } = require('../services');
const { ok } = require('../helpers/response.helper');

const CinemaController = module.exports;

CinemaController.list = async(req, res, next) => {
  try {
    const cinemas = await cinemaService.list();

    ok(req, res, cinemas);
  } catch (e) {
    next(e);
  }
};
