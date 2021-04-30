const { Actor, Film } = require('../models');

const ActorService = module.exports;

ActorService.getById = async(id) => {
  return Actor.findByPk(id, {
    include: { model: Film, attributes: ['id', 'name', 'poster'], through: { attributes: [] } }
  });
};
