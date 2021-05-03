module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('sessions', 'cinema_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      after: 'end_time'
    })
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('films', 'cinema_id')
  ])
};
