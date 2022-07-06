const _ = require('lodash');
const { User, Role } = require('../models');
const jwtHelper = require('../helpers/jwt.helper');
const cookieHelper = require('../helpers/cookie.helper');
const roleHelper = require('../helpers/role.helper');

module.exports = async(req, res, next) => {
  try {
    const { token } = cookieHelper.getData(req, 'token');

    if (_.isNil(token)) {
      return res.redirect('/ticket-inspector/login');
    }

    const { id } = jwtHelper.verifyAccessToken(token);

    if (_.isNil(id)) {
      return res.redirect('/ticket-inspector/login');
    }

    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'username', 'name', 'email'],
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });

    if (_.isNil(user)) {
      return res.redirect('/ticket-inspector/login');
    }

    user.rbac = {
      roles: roleHelper.extractRoleName(user.Roles),
      permissions: roleHelper.extractPermission(user.Roles)
    };

    if (user.rbac.roles.indexOf('ticket-inspector') === -1) {
      return res.redirect('/ticket-inspector/login');
    }

    req.currentUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      rbac: user.rbac
    };

    return next();
  } catch (e) {
    return res.redirect('/ticket-inspector/login');
  }
};
