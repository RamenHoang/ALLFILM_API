module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('food_drinks', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('food_drinks')
};
