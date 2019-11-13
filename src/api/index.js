const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const jwtAuth = require('./auth/jwt.auth');
const { httpMiddlewares, databaseMiddlewares } = require('../middlewares');

module.exports.init = (cb) => {
  const PORT = process.env.PORT || 3000;
  const app = express();

  app.use(bodyParser.json());
  app.use(httpMiddlewares.configCors);
  app.use(databaseMiddlewares.setDatabaseConnection);
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(jwtAuth.strategy);

  routes(app, express);

  app.listen(PORT, () => {
    cb();
    console.log(`Running server on '${process.env.NODE_ENV}' mode!`);
    console.log(`Server running on port ${PORT}!`);
  });
};
