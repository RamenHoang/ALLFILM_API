const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('actors')
    .then(() => queryInterface.bulkInsert(
      'actors',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/actor.json', 'utf8')),
      {}
    )),
  down: () => {}
};
