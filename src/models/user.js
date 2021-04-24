
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    name: DataTypes.STRING,
    registerVerifyingToken: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    fullname: DataTypes.STRING
  }, {
    tablename: 'users',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    // associations can be defined here
  };

  return User;
};
