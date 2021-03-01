const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('users')
    .then(() => queryInterface.bulkInsert(
      'users',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/user.json', 'utf8')),
      {}
    )),
  down: () => {}
};
