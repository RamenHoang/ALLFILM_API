const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('cinemas')
    .then(() => queryInterface.bulkInsert(
      'cinemas',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/cinema.json', 'utf8')),
      {}
    )),
  down: () => {}
};
