
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date: DataTypes.DATEONLY,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    price: DataTypes.INTEGER,
    emptySeats: DataTypes.STRING,
    bookedSeats: DataTypes.STRING,
    roomId: DataTypes.INTEGER,
    filmId: DataTypes.INTEGER
  }, {
    tablename: 'sessions',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  Session.associate = (models) => {
    Session.belongsTo(models.Film, {
      foreignKey: 'filmId'
    });
    Session.belongsTo(models.Room, {
      foreignKey: 'filmId'
    });
    Session.belongsTo(models.Cinema, {
      foreignKey: 'cinemaId'
    });
  };

  return Session;
};
