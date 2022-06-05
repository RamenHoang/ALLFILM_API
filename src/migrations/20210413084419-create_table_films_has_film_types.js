module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('films_has_film_types', {
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
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  }),

  down: (queryInterface) => queryInterface.dropTable('films_has_film_types')
};

