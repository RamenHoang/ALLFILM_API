module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('bookings', 'checked_out_at', {
      allowNull: true,
      type: Sequelize.DATE,
      after: 'updated_at'
    })
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('bookings', 'checked_out_at')
  ])
};
