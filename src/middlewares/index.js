const middleware = module.exports;

middleware.testProcess = (req, res, next) => {
  res.locals.isAPI = true;
  next();
};
