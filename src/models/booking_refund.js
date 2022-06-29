module.exports = (sequelize, DataTypes) => {
  const BookingRefund = sequelize.define('BookingRefund', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    bookingId: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    refundStatus: DataTypes.CHAR(1),
  }, {
    tablename: 'booking_refunds',
    underscored: true,
  });

  BookingRefund.associate = (models) => {
    BookingRefund.belongsTo(
      models.Booking,
      {
        foreignKey: 'bookingId'
      }
    );
  };

  return BookingRefund;
};
