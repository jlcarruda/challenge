const bodyParser = require('body-parser'); const express = require('express');
const database = require('./database');
const { httpMiddlewares, databaseMiddlewares } = require('./middlewares');


module.exports = function(cb) {
  'use strict';
  const app = express();
  const router = express.Router();
  const PORT = process.env.PORT || 5000;

  return database.connect()
    .then(() => {
      app.use(bodyParser.json());
      app.use('/', router);

      app.use(httpMiddlewares.configCors);
      app.use(databaseMiddlewares.setDatabaseConnection);

      app.listen(PORT, () => {
        cb();
        console.log(`Running server on '${process.env.NODE_ENV}' mode!`);
        console.log(`Server running on port ${PORT}!`);
      });
    })
    .catch(e => {
      console.log(`Error while connection to database: ${e.message}`);
      cb(e);
    });
};