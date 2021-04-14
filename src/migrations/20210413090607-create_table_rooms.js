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
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('rooms')
};
