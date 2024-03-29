module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('rooms', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    row: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    column: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cinema_id: {
      type: Sequelize.INTEGER,
      allowNull: false
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

  down: (queryInterface) => queryInterface.dropTable('rooms')
};
