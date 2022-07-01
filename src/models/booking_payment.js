const { BOOKING_PAYMENT } = require('../constants');

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
    paymentPayload: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.CHAR(1),
      validate: {
        isIn: [
          [
            BOOKING_PAYMENT.PAID,
            BOOKING_PAYMENT.NOT_PAID,
            BOOKING_PAYMENT.REQUESTED_REFUND,
            BOOKING_PAYMENT.RESOVLED_REFUND,
          ]
        ]
      }
    }
  }, {
    tablename: 'booking_payments',
    underscored: true,
    timestamps: true
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
