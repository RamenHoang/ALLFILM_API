module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('bookings', 'is_close', {
    defaultValue: false,
    type: Sequelize.BOOLEAN,
  }),
  down: (queryInterface) => queryInterface.removeColumn('bookings', 'is_close')
};
