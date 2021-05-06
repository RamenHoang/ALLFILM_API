const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('food_drinks')
    .then(() => queryInterface.bulkInsert(
      'food_drinks',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/food_drink.json', 'utf8')),
      {}
    )),
  down: () => {}
};
