
module.exports = (sequelize, DataTypes) => {
  const FilmType = sequelize.define('FilmType', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING
  }, {
    tablename: 'film_types',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  FilmType.associate = (models) => {
    // associations can be defined here
  };

  return FilmType;
};
