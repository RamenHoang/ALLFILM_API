const PromiseHelper = module.exports;

PromiseHelper.promiseParallel = (obj) => {
  const keys = Object.keys(obj);

  return Promise.all(
    keys.map((k) => obj[k])
  )
    .then((results) => {
      const data = {};

      keys.forEach((k, i) => {
        data[k] = results[i];
      });

      return data;
    });
};
