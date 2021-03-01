const _ = require('lodash');
const { UnauthorizedError, ForbiddenError } = require('../errors');

const RBAC = module.exports;

RBAC.hasRole = (...desireRoles) => (async(req, res, next) => {
  const user = req.currentUser;

  if (_.isEmpty(user)) return next(new UnauthorizedError(t('unauthorized')));

  const { roles } = user.rbac;
  let has = false;

  for (let i = 0; i < desireRoles.length; i++) {
    if (_.includes(roles, desireRoles[i])) {
      has = true;
      break;
    }
  }

  return has ? next() : next(new ForbiddenError(t('forbidden')));
});
