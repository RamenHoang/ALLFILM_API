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
      defaultValue: Sequelize.NOW,
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
      type: Sequelize.TEXT,
      allowNull: false
    },
    director_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rating: {
      type: Sequelize.DOUBLE,
      defaultValue: 0.0
    },
    rating_turn: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  }),

  down: (queryInterface) => queryInterface.dropTable('films')
};
