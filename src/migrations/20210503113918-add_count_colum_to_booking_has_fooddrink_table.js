module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('bookings_has_food_drinks', 'count', {
      allowNull: false,
      type: Sequelize.INTEGER,
      after: 'food_drink_id'
    })
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('bookings_has_food_drinks', 'count')
  ])
};
