const express = require('express');
const validate = require('../validations/validate');
const { AuthValidation } = require('../validations');

function addRoutes(router, middleware, controllers) {
  router.post(
    '/login',
    validate([AuthValidation.validateLogin]),
    controllers.auth.login
  );

  // router.post(
  //   '/auth/:social_type/auth-redirect',
  //   validate([
  //     AuthValidator.generateAuthLink,
  //   ]),
  //   controllers.auth.generateAuthLink
  // );
}

function apiRouter(middleware, controllers) {
  const router = new express.Router();

  addRoutes(router, middleware, controllers);

  return router;
}

module.exports = (app, middleware, controllers) => {
  app.use('/api/v1/', apiRouter(middleware, controllers));
};
