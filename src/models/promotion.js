
const { generateRandomString } = require('../helpers/string.helper');

module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('Promotion', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: generateRandomString()
    },
    image: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    tablename: 'bookings',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  Promotion.associate = (models) => {
  };

  return Promotion;
};
