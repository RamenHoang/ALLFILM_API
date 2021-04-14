module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('film_types', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('film_types')
};
