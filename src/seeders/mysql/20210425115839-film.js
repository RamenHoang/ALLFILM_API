const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('films')
    .then(() => queryInterface.bulkInsert(
      'films',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/film.json', 'utf8')),
      {}
    )),
  down: () => {}
};
