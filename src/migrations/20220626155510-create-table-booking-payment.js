module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('booking_payments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    booking_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    payment_payload: Sequelize.TEXT
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  }),

  down: (queryInterface) => queryInterface.dropTable('booking_payments')
};
