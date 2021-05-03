const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('rooms')
    .then(() => queryInterface.bulkInsert(
      'rooms',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/room.json', 'utf8')),
      {}
    )),
  down: () => {}
};
