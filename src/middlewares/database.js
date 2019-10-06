
const mongoose = require('mongoose');

module.exports.setDatabaseConnection = async (req, res, next) => {
  "use strict";
  req.conn = mongoose.connection;
  next();
};