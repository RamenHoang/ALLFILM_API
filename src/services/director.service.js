const { Director, Film } = require('../models');

const DirectorService = module.exports;

DirectorService.getById = async(id) => Director.findByPk(id, {
  include: { model: Film, attributes: ['id', 'name', 'poster'] },
});
