const { foodDrinkService } = require('../services');
const { ok } = require('../helpers/response.helper');

const FoodDrinkController = module.exports;

FoodDrinkController.list = async(req, res, next) => {
  try {
    const foodDrinks = await foodDrinkService.list();

    ok(req, res, foodDrinks);
  } catch (e) {
    next(e);
  }
};
