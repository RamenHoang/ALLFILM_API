module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('directors', {
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
    date_of_birth: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    images: {
      type: Sequelize.STRING,
      allowNull: true
    },
    nation: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('directors')
};
