const _ = require('lodash');
const { Op } = require('sequelize');
const {
  Cinema,
  Session,
  Room
} = require('../models');
const datetimeHelper = require('../helpers/datetime.helper');

const SessionService = module.exports;

SessionService.list = (queryOption) => {
  const option = {};

  if (!_.isNil(queryOption.cinemaId)) {
    option.where = {
      id: queryOption.cinemaId
    };
  }

  option.attributes = ['id', 'name', 'address'];
  option.include = {
    model: Session
  };

  if (!_.isNil(queryOption.filmId)) {
    if (_.isNil(option.include.where)) {
      option.include.where = {};
    }
    option.include.where.filmId = queryOption.filmId;
  }

  if (!_.isNil(queryOption.date)) {
    if (_.isNil(option.include.where)) {
      option.include.where = {};
    }
    option.include.where.date = queryOption.date;
  }

  option.include.where.startTime = {
    [Op.gt]: datetimeHelper.now()
  };

  option.include.attributes = ['id', 'date', 'startTime'];

  return Cinema.findAll(option);
};

SessionService.getById = (id) => Session.findByPk(id, {
  include: {
    model: Room,
    attributes: ['name', 'row', ['col', 'column']]
  }
});
