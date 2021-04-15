
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    permition: {
      type: Sequelize.STRING(1),
      allowNull: false
    },
    entity: {
      type: Sequelize.STRING(15),
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
  down: (queryInterface) => queryInterface.dropTable('roles')
};
