const CookieHelper = module.exports;

CookieHelper.storeData = (response, dataToStore) => {
  Object.keys(dataToStore).forEach((key) => {
    response.cookie(key, dataToStore[key], {
      httpOnly: true
    });
  });
};

CookieHelper.getData = (request, ...keys) => keys.reduce(
  (object, key) => {
    object[key] = request.cookies[key];

    return object;
  },
  {}
);

CookieHelper.deleteData = (response, ...keys) => {
  keys.forEach((key) => {
    response.clearCookie(key);
  });
};
