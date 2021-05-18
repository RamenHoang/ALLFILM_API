module.exports = {
  up: (queryInterface) => Promise.all([
    queryInterface.renameColumn('rooms', 'column', 'col'),
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.renameColumn('rooms', 'col', 'column')
  ])
};
