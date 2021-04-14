
module.exports = (sequelize, DataTypes) => {
  const FoodDrink = sequelize.define('FoodDrink', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    tablename: 'food_drinks',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  FoodDrink.associate = (models) => {
    // associations can be defined here
  };

  return FoodDrink;
};
