
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    filmId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'ratings',
    underscored: true,
    timestamps: false
  });

  Rating.associate = (models) => {
    models.User.belongsToMany(models.Film, { through: Rating });
    models.Film.belongsToMany(models.User, { through: Rating });
  };

  return Rating;
};
