const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('films_has_film_types')
    .then(() => queryInterface.bulkInsert(
      'films_has_film_types',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/film_has_film_type.json', 'utf8')),
      {}
    )),
  down: () => {}
};
