
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    row: DataTypes.INTEGER,
    coloumn: DataTypes.INTEGER,
    cinemaId: DataTypes.INTEGER
  }, {
    tablename: 'rooms',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  Room.associate = (models) => {
    Room.belongsTo(models.Cinema, {
      foreignKey: 'cinemaId'
    });
  };

  return Room;
};
