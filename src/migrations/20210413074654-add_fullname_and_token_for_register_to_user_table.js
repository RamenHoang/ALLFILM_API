
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('users', 'fullname', {
    allowNull: true,
    type: Sequelize.STRING,
    after: 'phone'
  }).then(() => queryInterface.addColumn('users', 'register_verifying_token', {
    allowNull: true,
    type: Sequelize.STRING,
    after: 'fullname'
  })),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('users', 'fullname'),
    queryInterface.removeColumn('users', 'register_verifying_token')
  ])
};
