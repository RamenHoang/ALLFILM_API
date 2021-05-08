const { FoodDrink } = require('../models');

const FoodDrinkService = module.exports;

FoodDrinkService.list = () => FoodDrink.findAll({
  attributes: ['id', 'name', 'price']
});
