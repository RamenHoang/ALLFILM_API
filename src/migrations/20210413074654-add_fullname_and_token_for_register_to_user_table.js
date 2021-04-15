
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('users', 'fullname', {
      allowNull: true,
      type: Sequelize.STRING(12),
      after: 'phone'
    }),
    queryInterface.addColumn('users', 'register_verifying_token', {
      allowNull: true,
      type: Sequelize.STRING,
      after: 'fullname'
    })
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('users', 'fullname'),
    queryInterface.removeColumn('users', 'register_verifying_token')
  ])
};
