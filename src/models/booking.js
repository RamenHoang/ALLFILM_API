
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    bookingTime: DataTypes.DATE,
    keepingTime: DataTypes.DATE,
    fee: DataTypes.DOUBLE,
    seats: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    sessionId: DataTypes.INTEGER,
    sessionRoomId: DataTypes.INTEGER,
    qrCode: DataTypes.STRING
  }, {
    tablename: 'bookings',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  Booking.associate = (models) => {
    Booking.belongsTo(models.Session, {
      foreignKey: 'sessionId'
    });
    Booking.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };

  return Booking;
};