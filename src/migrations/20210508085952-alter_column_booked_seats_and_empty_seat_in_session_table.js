module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('sessions', 'empty_seats', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: 'A-0,A-1,A-2,A-3,A-4,A-5,A-6,A-7,A-8,A-9,A-10,A-11,B-0,B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9,B-10,B-11,C-0,C-1,C-2,C-3,C-4,C-5,C-6,C-7,C-8,C-9,C-10,C-11,D-0,D-1,D-2,D-3,D-4,D-5,D-6,D-7,D-8,D-9,D-10,D-11,E-0,E-1,E-2,E-3,E-4,E-5,E-6,E-7,E-8,E-9,E-10,E-11,F-0,F-1,F-2,F-3,F-4,F-5,F-6,F-7,F-8,F-9,F-10,F-11,G-0,G-1,G-2,G-3,G-4,G-5,G-6,G-7,G-8,G-9,G-10,G-11,H-0,H-1,H-2,H-3,H-4,H-5,H-6,H-7,H-8,H-9,H-10,H-11,I-0,I-1,I-2,I-3,I-4,I-5,I-6,I-7,I-8,I-9,I-10,I-11,J-0,J-1,J-2,J-3,J-4,J-5,J-6,J-7,J-8,J-9,J-10,J-11'
    }),
    queryInterface.changeColumn('sessions', 'booked_seats', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: ''
    }),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('sessions', 'empty_seats', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.changeColumn('sessions', 'booked_seats', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    }),
  ])
};
