
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_roles', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    role_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('user_roles')
};
