
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    permition: DataTypes.STRING,
    entity: DataTypes.STRING
  }, {
    tablename: 'role',
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  Role.associate = (models) => {
    // associations can be defined here
  };

  return Role;
};
