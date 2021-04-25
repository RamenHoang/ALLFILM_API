const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('films_has_actors')
    .then(() => queryInterface.bulkInsert(
      'films_has_actors',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/film_has_actor.json', 'utf8')),
      {}
    )),
  down: () => {}
};
