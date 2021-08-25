const _ = require('lodash');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { saltRound } = require('../../config/app');

const { REGEX } = require('../../constants');
const {
  User, Role, UserRole, masterDB
} = require('../../models');
const roleHelper = require('../../helpers/role.helper');

const UserController = module.exports;

const controller = 'user';
const VIEW_SHOW_PATH = 'admin/users/view';
const VIEW_EDIT_PATH = 'admin/users/edit';
const VIEW_ADD_PATH = 'admin/users/add';

function userMapper(user) {
  if (_.isNil(user)) return {};

  return {
    id: user.id,
    username: user.username,
    fullname: user.fullname,
    name: user.name,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
    rbac: {
      roles: roleHelper.extractRoleName(user.Roles),
      permissions: roleHelper.extractPermission(user.permition)
    },
    roleIds: roleHelper.extractRoleIds(user.Roles)
  };
}

function listUserMapper(listUsers) {
  if (_.isNil(listUsers)) return [];

  return _.map(listUsers, (userObject) => userMapper(userObject));
}

UserController.list = async(req, res, next) => {
  try {
    const loginUser = req.currentUser;
    const users = await User.findAll({
      where: {
        id: {
          [Op.not]: loginUser.id
        }
      },
      attributes: ['id', 'name', 'email', 'phone', 'createdAt'],
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });

    const action = 'list';
    const data = listUserMapper(users);
    const errorData = {};

    res.render('admin/users/list', {
      page_title: 'Admin - Dashboard',
      data,
      loginUser,
      controller,
      action,
      errorData,
    });
  } catch (e) {
    next(e);
  }
};

UserController.getById = async(req, res) => {
  try {
    const userid = req.params.id;
    const loginUser = req.currentUser;
    const { originalUrl } = req;

    let viewPath = '';
    const roles = await Role.findAll({ raw: true });
    const data = { sytemRoles: roles, user: {} };
    const errorData = {};
    let action;

    if (originalUrl.indexOf('edit') !== -1) {
      viewPath = VIEW_EDIT_PATH;
      action = 'edit';
    } else if (originalUrl.indexOf('add') !== -1) {
      viewPath = VIEW_ADD_PATH;
      action = 'add';
    } else {
      viewPath = VIEW_SHOW_PATH;
      action = 'show';
    }

    if (viewPath !== VIEW_ADD_PATH) {
      const user = await User.findByPk(userid, {
        where: {
          id: {
            [Op.not]: loginUser.id
          }
        },
        include: {
          model: Role,
          through: { attributes: [] }
        }
      });

      data.user = userMapper(user);
    }

    res.render(viewPath, {
      page_title: 'Admin - Dashboard',
      controller,
      loginUser,
      data,
      action,
      errorData
    });
  } catch (e) {
    console.error(e);
  }
};

UserController.updateById = async(req, res) => {
  try {
    const userId = req.params.id;
    const {
      name, username, firstname, email, phone, roles, password
    } = req.body;

    if (!password.match(REGEX.PASSWORD)) {
      throw new Error();
    }

    const passwordHash = await bcrypt.hash(password, saltRound);

    await masterDB.transaction(async(t) => {
      await User.update(
        {
          name, username, firstname, email, phone, passwordHash
        },
        {
          where: { id: userId },
          transaction: t
        }
      );

      const userRole = _.map(roles, (roleId) => ({
        user_id: userId,
        role_id: roleId
      }));

      await UserRole.destroy({
        where: {
          user_id: userId
        },
        transaction: t
      });

      await UserRole.bulkCreate(userRole, { transaction: t });
    });

    req.flash('success', 'Tài khoản được cập nhật thành công');
    res.redirect('/admin/user/list');
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình cập nhật tài khoản');
    res.redirect('/admin/user/list');
  }
};

UserController.deleteById = async(req, res) => {
  try {
    const userId = req.params.id;

    await masterDB.transaction(async(t) => {
      await User.destroy({
        where: { id: userId },
        transaction: t
      });

      await UserRole.destroy({
        where: { user_id: userId },
        transaction: t
      });
    });

    req.flash('success', 'Tài khoản được xóa thành công');
    res.redirect('/admin/user/list');
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình xóa tài khoản');
    res.redirect('/admin/user/list');
  }
};

UserController.createNew = async(req, res) => {
  try {
    const {
      name, username, firstname, email, phone, roles, password
    } = req.body;

    if (!password.match(REGEX.PASSWORD)) {
      throw new Error();
    }

    const hashedPassword = await bcrypt.hash(password, saltRound);

    await masterDB.transaction(async(t) => {
      const newUser = await User.create(
        {
          name, username, firstname, email, phone, passwordHash: hashedPassword
        },
        {
          transaction: t
        }
      );

      const userRole = _.map(roles, (roleId) => ({
        user_id: newUser.id,
        role_id: roleId
      }));

      await UserRole.bulkCreate(userRole, { transaction: t });
    });

    req.flash('success', 'Tài khoản được thêm thành công');
    res.redirect('/admin/user/list');
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình thêm tài khoản');
    res.redirect('/admin/user/list');
  }
};
