const Joi = require('@hapi/joi');
const _ = require('lodash');
const { VALIDATE_ON } = require('../constants');

const ActorValidation = module.exports;

ActorValidation.validateGet = {
  [VALIDATE_ON.PARAMS]: Joi.object({
    id: Joi.number().required()
  })
};
