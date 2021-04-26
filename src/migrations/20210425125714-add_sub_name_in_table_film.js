module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('films', 'sub_name', {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: '',
      after: 'name'
    })
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('films', 'sub_name')
  ])
};
