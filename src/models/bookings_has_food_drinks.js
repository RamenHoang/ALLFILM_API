
module.exports = (sequelize, DataTypes) => {
  const BookFoodDrink = sequelize.define('BookFoodDrink', {
    bookingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    bookingUserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    foodDrinkId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'bookings_has_food_drinks',
    underscored: true,
    timestamps: false
  });

  BookFoodDrink.associate = (models) => {
    models.Booking.belongsToMany(models.FoodDrink, { through: BookFoodDrink });
    models.FoodDrink.belongsToMany(models.Booking, { through: BookFoodDrink });
  };

  return BookFoodDrink;
};
