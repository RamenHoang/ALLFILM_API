module.exports = {
  up: (queryInterface) => Promise.all([
    queryInterface.addIndex('films', ['name'], { name: 'films_name' }),
    queryInterface.addIndex('films', ['sub_name'], { name: 'films_sub_name' })
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeIndex('films', 'films_name'),
    queryInterface.removeIndex('films', 'films_sub_name')
  ])
};
