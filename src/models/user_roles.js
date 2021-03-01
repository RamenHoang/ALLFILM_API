
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
  }, {
    tableName: 'user_roles',
    underscored: true,
    timestamps: false
  });

  UserRole.associate = (models) => {
    models.User.belongsToMany(models.Role, { through: UserRole });
    models.Role.belongsToMany(models.User, { through: UserRole });
  };

  return UserRole;
};
