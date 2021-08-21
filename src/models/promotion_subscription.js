
module.exports = (sequelize, DataTypes) => {
  const PromotionSubscription = sequelize.define('PromotionSubscription', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    tablename: 'bookings',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  PromotionSubscription.associate = (models) => {
  };

  return PromotionSubscription;
};
