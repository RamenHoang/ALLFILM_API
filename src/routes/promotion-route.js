const express = require('express');
const validate = require('../validations/validate');
const { AuthValidation } = require('../validations');

const route = express.Router();
const { promotion } = require('../controllers');

route.get('/:id', promotion.getById);

route.get('', promotion.list);

route.post('', validate([AuthValidation.validateEmail]), promotion.subscribe);

module.exports = route;
