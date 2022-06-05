module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('promotions', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
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
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  }),
  down: (queryInterface) => queryInterface.dropTable('promotions')
};
