
module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define('Actor', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    description: DataTypes.STRING,
    images: DataTypes.STRING,
    nation: DataTypes.STRING
  }, {
    tablename: 'actors',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  Actor.associate = (models) => {
    // associations can be defined here
  };

  return Actor;
};
