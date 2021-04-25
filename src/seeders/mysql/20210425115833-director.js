const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('directors')
    .then(() => queryInterface.bulkInsert(
      'directors',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/director.json', 'utf8')),
      {}
    )),
  down: () => {}
};
