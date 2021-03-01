
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('users', 'phone', {
      allowNull: true,
      type: Sequelize.STRING,
      after: 'password_hash'
    }),
    queryInterface.addColumn('users', 'email', {
      allowNull: false,
      type: Sequelize.STRING,
      after: 'phone'
    }),
  ]),

  down: (queryInterface,) => Promise.all([
    queryInterface.removeColumn('users', 'phone'),
    queryInterface.removeColumn('users', 'email')
  ])
};
