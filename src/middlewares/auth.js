const _ = require('lodash');
const { User, Role } = require('../models');
const { UnauthorizedError } = require('../errors');
const jwtHelper = require('../helpers/jwt.helper');
const { ROLES } = require('../constants');

module.exports = async(req, res, next) => {
  if (!req.headers.authorization) return next(new UnauthorizedError(t('unauthorized')));

  const regex = /^Bearer (.+)$/;
  const found = req.headers.authorization.match(regex);

  if (!found || found.length !== 2) return next(new UnauthorizedError(t('unauthorized')));

  const jwtToken = found[1];

  try {
    const { id } = jwtHelper.verifyAccessToken(jwtToken);

    if (!id) return next(new UnauthorizedError(t('unauthorized')));

    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'username', 'name', 'email'],
      include: [
        Role
      ]
    });

    if (_.isEmpty(user)) return next(new UnauthorizedError(t('unauthorized')));

    user.rbac = {
      roles: _.map(user.Roles, 'name'),
      permissions: _.map(user.Permissions, 'name')
    };

    // Add default role if user don't have any role.
    if (_.isEmpty(user.rbac.roles)) user.rbac.roles = [ROLES.DEFAULT];

    req.currentUser = user;

    return next();
  } catch (e) {
    return next(new UnauthorizedError(t('unauthorized')));
  }
};
