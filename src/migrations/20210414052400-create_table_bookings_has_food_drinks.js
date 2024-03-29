module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('bookings_has_food_drinks', {
    booking_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    booking_user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    food_drink_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  }),

  down: (queryInterface) => queryInterface.dropTable('bookings_has_food_drinks')
};
