module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ratings', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    film_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('ratings')
};
