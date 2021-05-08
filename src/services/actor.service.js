const { Actor, Film } = require('../models');

const ActorService = module.exports;

ActorService.getById = async(id) => Actor.findByPk(id, {
  include: { model: Film, attributes: ['id', 'name', 'poster'], through: { attributes: [] } }
});
