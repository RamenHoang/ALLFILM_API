const ObjectHelper = module.exports;

module.exports.keysToCamelCase = (o) => {
  if (typeof o !== 'object') {
    return o;
  }

  const r = {};

  Object.keys(o).forEach((k) => {
    r[ObjectHelper.stringToCamelCase(k)] = o[k];
  });

  return r;
};

ObjectHelper.stringToCamelCase = (s) => s.replace(/([-_][a-z])/gi, ($1) => $1
  .toUpperCase()
  .replace('-', '')
  .replace('_', ''));
