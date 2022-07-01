module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'booking_payments',
      'status',
      {
        type: Sequelize.CHAR(1),
      }
    ),
    queryInterface.addColumn(
      'booking_payments',
      'created_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    ),
    queryInterface.addColumn(
      'booking_payments',
      'updated_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    ),
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('booking_payments', 'status'),
    queryInterface.removeColumn('booking_payments', 'created_at'),
    queryInterface.removeColumn('booking_payments', 'updated_at'),
  ])
};
