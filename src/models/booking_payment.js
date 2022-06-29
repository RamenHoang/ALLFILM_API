module.exports = (sequelize, DataTypes) => {
  const BookingPayment = sequelize.define('BookingPayment', {
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
    paymentPayload: DataTypes.TEXT
  }, {
    tablename: 'booking_payments',
    underscored: true,
    timestamps: false
  });

  BookingPayment.associate = (models) => {
    BookingPayment.belongsTo(
      models.Booking,
      {
        foreignKey: 'bookingId'
      }
    );
  };

  return BookingPayment;
};
