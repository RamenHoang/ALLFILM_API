module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('promotions', 'name', {
    type: Sequelize.STRING,
    allowNull: false
  }),
  down: (queryInterface) => queryInterface.removeColumn('promotions', 'name')
};
