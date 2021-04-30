const { Director, Film } = require('../models');

const DirectorService = module.exports;

DirectorService.getById = async(id) => {
  return Director.findByPk(id, {
    include: { model: Film, attributes: ['id', 'name', 'poster'] },
  });
};
