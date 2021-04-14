
module.exports = (sequelize, DataTypes) => {
  const Director = sequelize.define('Director', {
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
    tablename: 'directors',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  Director.associate = (models) => {
    // associations can be defined here
  };

  return Director;
};
