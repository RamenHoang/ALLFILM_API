const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('roles')
    .then(() => queryInterface.bulkInsert(
      'roles',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/role.json', 'utf8')),
      {}
    )),
  down: () => {}
};
