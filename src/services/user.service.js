const _ = require('lodash');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { saltRound } = require('../config/app');
const {
  User,
  Role,
  UserRole,
  masterDB
} = require('../models');

const UserService = module.exports;

UserService.getById = (id) => User.findByPk(id, {
  include: {
    model: Role,
    through: { attributes: [] },
    attributes: { exclude: ['updatedAt', 'createdAt'] }
  },
  attributes: { exclude: ['passwordHash', 'updatedAt', 'createdAt'] }
});

UserService.list = (queryOption) => {
  const {
    q,
    offset,
    limit,
    sortBy
  } = queryOption;

  const option = {
    where: {
      [Op.or]: {
        name: { [Op.like]: `%${q}%` },
        fullname: { [Op.like]: `%${q}%` },
        email: { [Op.like]: `%${q}%` }
      }
    },
    order: sortBy.split(',')
      .map((item) => [
        item.slice(1, item.length),
        item.slice(0, 1) === '*' ? 'ASC' : 'DESC'
      ]),
    offset: (offset - 1) * limit,
    limit,
    include: {
      model: Role,
      through: { attributes: [] },
      attributes: { exclude: ['updatedAt', 'createdAt'] }
    },
    attributes: { exclude: ['passwordHash'] }
  };

  return User.findAll(option);
};

UserService.updateProfile = (id, profile) => User.update(profile, {
  where: { id }
});

UserService.updatePassword = async(userId, newPassword) => {
  const newHashPassword = await bcrypt.hash(newPassword, saltRound);

  return User.update({
    passwordHash: newHashPassword
  }, {
    where: {
      id: userId
    }
  });
};

UserService.createUser = async(userInfo, userRole) => {
  const passwordHash = await bcrypt.hash(userInfo.password, saltRound);
  let newUserId;

  await masterDB.transaction(async(t) => {
    const user = await User.create(
      {
        ..._.pick(userInfo, ['name', 'username', 'fullname', 'phone', 'email']),
        passwordHash
      },
      { transaction: t }
    );

    newUserId = user.id;

    userRole = _.map(userRole, (item) => ({
      user_id: newUserId,
      role_id: item
    }));

    await UserRole.bulkCreate(userRole, { transaction: t });
  });

  return User.findByPk(newUserId, {
    include: {
      model: Role,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      through: {
        attributes: []
      }
    },
    attributes: {
      exclude: ['passwordHash']
    }
  });
};
