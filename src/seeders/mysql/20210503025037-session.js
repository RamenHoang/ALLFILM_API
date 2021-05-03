const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('sessions')
    .then(() => queryInterface.bulkInsert(
      'sessions',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/session.json', 'utf8')),
      {}
    )),
  down: () => {}
};
