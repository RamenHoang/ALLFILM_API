module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn(
    'roles',
    'name', {
      type: Sequelize.STRING(255)
    }
  ),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn(
    'roles',
    'name',
    {
      type: Sequelize.STRING(10)
    }
  )
};
