module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('films', 'duration', {
      allowNull: true,
      type: Sequelize.INTEGER,
      defaultValue: 0,
      after: 'name'
    })
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('films', 'duration')
  ])
};
