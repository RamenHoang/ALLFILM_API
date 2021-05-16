module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('films', 'director_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    }),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('films', 'director_id', {
      type: Sequelize.INTERGER,
      allowNull: false,
    })
  ])
};
