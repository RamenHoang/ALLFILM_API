module.exports = {
  up: (queryInterface) => Promise.all([
    queryInterface.addIndex('actors', ['name'], { name: 'actors_name' }),
    queryInterface.addIndex('directors', ['name'], { name: 'directors_name' }),
  ]),

  down: (queryInterface) => Promise.all([
    queryInterface.removeIndex('actors', 'actors_name'),
    queryInterface.removeIndex('directors', 'directors_name')
  ])
};
