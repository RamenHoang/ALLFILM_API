const express = require('express');
const validate = require('../validations/validate');
const { ActorValidation } = require('../validations');

const route = express.Router();
const { actor } = require('../controllers');

route.get('/:id', validate([ActorValidation.validateGet]), actor.getById);

module.exports = route;
