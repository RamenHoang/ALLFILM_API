const { Op } = require('sequelize');
const _ = require('lodash');

const {
  Director
} = require('../../models');
// const roleHelper = require('../../helpers/role.helper');

const DirectorController = module.exports;

DirectorController.get = async(req, res) => {
  const directorQueryName = req.query.name;

  const directors = await Director.findAll({
    where: {
      name: {
        [Op.like]: `%${directorQueryName}%`
      }
    },
    raw: true
  });

  const idAndNameOfDirectors = _.map(
    directors,
    (director) => ({ id: director.id, name: director.name })
  );

  return res.status(200).json(idAndNameOfDirectors);
};
