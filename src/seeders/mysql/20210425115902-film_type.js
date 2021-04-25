const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('film_types')
    .then(() => queryInterface.bulkInsert(
      'film_types',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/film_type.json', 'utf8')),
      {}
    )),
  down: () => {}
};
