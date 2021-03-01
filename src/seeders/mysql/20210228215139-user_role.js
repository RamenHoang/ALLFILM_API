const fs = require('fs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkDelete('user_roles')
    .then(() => queryInterface.bulkInsert(
      'user_roles',
      JSON.parse(fs.readFileSync('./src/seeders/mysql/data/user_role.json', 'utf8')),
      {}
    )),
  down: () => {}
};
