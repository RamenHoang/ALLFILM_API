module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('films_has_actors', {
    film_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    actor_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  }),

  down: (queryInterface) => queryInterface.dropTable('films_has_actors')
};

