
module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define('Film', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    subName: DataTypes.STRING,
    publishDate: DataTypes.DATEONLY,
    trailer: DataTypes.STRING,
    poster: DataTypes.STRING,
    nation: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.DOUBLE,
    ratingTurn: DataTypes.INTEGER,
    directorId: DataTypes.INTEGER,
    duration: DataTypes.INTEGER
  }, {
    tablename: 'films',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  Film.associate = (models) => {
    Film.belongsTo(models.Director, {
      foreignKey: 'directorId'
    });
  };

  return Film;
};
