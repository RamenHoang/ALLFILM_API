module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('films', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    publish_date: {
      type: Sequelize.DATEONLY,
      default: Sequelize.NOW,
      allowNull: false
    },
    trailer: {
      type: Sequelize.STRING,
      allowNull: true
    },
    poster: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nation: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    director_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rating: {
      type: Sequelize.DOUBLE,
      default: 0.0
    },
    rating_turn: {
      type: Sequelize.INTEGER,
      default: 0
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('films')
};
