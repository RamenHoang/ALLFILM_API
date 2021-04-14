module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('films_has_actors', {
    film_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    film_type_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('films_has_actors')
};

