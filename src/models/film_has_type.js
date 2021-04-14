
module.exports = (sequelize, DataTypes) => {
  const FilmHasType = sequelize.define('FilmHasType', {
    filmId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    filmTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'films_has_film_types',
    underscored: true,
    timestamps: false
  });

  FilmHasType.associate = (models) => {
    models.Film.belongsToMany(models.FilmType, { through: FilmHasType });
    models.FilmType.belongsToMany(models.Film, { through: FilmHasType });
  };

  return FilmHasType;
};
