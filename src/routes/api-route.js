const express = require('express');
const auth = require('../middlewares/auth');

function addRoutes(router, middleware, controllers) {
  // Get api status
  router.get(
    '/status',
    auth,
    controllers.api.status
  );
}

function apiRouter(middleware, controllers) {
  const router = new express.Router();

  addRoutes(router, middleware, controllers);

  return router;
}

module.exports = (app, middleware, controllers) => {
  app.use('/api/v1/', apiRouter(middleware, controllers));
};
