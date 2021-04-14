module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cinemas', {
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
    address: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('cinemas')
};
