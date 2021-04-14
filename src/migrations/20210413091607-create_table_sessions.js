module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sessions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    start_time: {
      type: Sequelize.DATE,
      allowNull: false
    },
    end_time: {
      type: Sequelize.DATE,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    empty_seats: {
      type: Sequelize.STRING,
      allwNull: false
    },
    booked_seats: {
      type: Sequelize.STRING,
      allowNull: false,
      default: ''
    },
    room_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    film_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('sessions')
};
