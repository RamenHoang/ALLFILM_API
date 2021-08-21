module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('promotions', 'content', {
    type: Sequelize.TEXT,
    allowNull: false,
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('promotions', 'content', {
    type: Sequelize.STRING,
    allowNull: false,
  })
};
