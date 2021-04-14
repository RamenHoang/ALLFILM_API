
module.exports = (sequelize, DataTypes) => {
  const FilmActor = sequelize.define('FilmActor', {
    filmId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    actorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'films_has_actors',
    underscored: true,
    timestamps: false
  });

  FilmActor.associate = (models) => {
    models.Film.belongsToMany(models.Actor, { through: FilmActor });
    models.Actor.belongsToMany(models.Film, { through: FilmActor });
  };

  return FilmActor;
};
