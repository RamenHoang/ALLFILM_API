module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('bookings', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    booking_time: {
      type: Sequelize.DATE,
      allowNull: false
    },
    keeping_time: {
      type: Sequelize.DATE,
      allowNull: false
    },
    fee: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    seats: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    session_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    session_room_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    qr_code: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('bookings')
};
