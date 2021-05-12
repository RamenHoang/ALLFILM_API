const _ = require('lodash');

const RoleHelper = module.exports;

RoleHelper.extractRoleName = (roleObjects) => _.uniq(_.map(roleObjects, (roleObj) => roleObj.name));

RoleHelper.extractPermission = (roleObjects) => _.reduce(
  roleObjects,
  (permissions, roleObj) => {
    if (_.isSet(roleObj.permition) && _.isNil(roleObj.entity)) {
      permissions[roleObj.permition].push(roleObj.entity);
    }

    return permissions;
  }, {
    r: [],
    w: []
  }
);

RoleHelper.extractRoleIds = (roleObjects) => _.map(roleObjects, (roleObj) => roleObj.id);
