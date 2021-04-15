module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('actors', {
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
  }),

  down: (queryInterface) => queryInterface.dropTable('actors')
};
