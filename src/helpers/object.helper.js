const ObjectHelper = module.exports;

ObjectHelper.keysToCamelCase = (o) => {
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

ObjectHelper.sortObject = (object) => {
  const sorted = {};
  let key;
  const a = [];

  // eslint-disable-next-line no-restricted-syntax
  for (key in object) {
    // eslint-disable-next-line no-prototype-builtins
    if (object.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = object[a[key]];
  }

  return sorted;
};
