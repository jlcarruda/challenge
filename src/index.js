'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const { http } = require('./middlewares');

const app = express();
const router = express.Router();


module.exports = function() {

  app.use(bodyParser.json());
  app.use('/', router);

  app.use(http.configCors);

  app.listen(3000, function() {
    console.log("Listening on port 3000");
  });
};