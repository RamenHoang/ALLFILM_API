module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('booking_refunds', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    booking_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    refund_status: {
      type: Sequelize.CHAR(1)
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

  down: (queryInterface) => queryInterface.dropTable('booking_refunds')
};
