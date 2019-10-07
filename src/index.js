const bodyParser = require('body-parser'); const express = require('express');
const database = require('./database');
const { httpMiddlewares, databaseMiddlewares } = require('./middlewares');

const app = express();
const router = express.Router();

module.exports = function(cb) {
  'use strict';

  return database.connect().then(() => {
    app.use(bodyParser.json());
    app.use('/', router);

    app.use(httpMiddlewares.configCors);
    app.use(databaseMiddlewares.setDatabaseConnection);

    app.listen(3000, () => {
      console.log("Server running on port 3000!");
      cb();
    });
  });
};