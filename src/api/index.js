const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const jwtAuth = require('./auth/jwt.auth');
const { httpMiddlewares, databaseMiddlewares } = require('../middlewares');

module.exports = (cb) => {
  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(jwtAuth.initialize());

  app.use(httpMiddlewares.configCors);
  app.use(databaseMiddlewares.setDatabaseConnection);

  routes(app, express);

  app.listen(PORT, () => {
    cb();
    console.log(`Running server on '${process.env.NODE_ENV}' mode!`);
    console.log(`Server running on port ${PORT}!`);
  });
};