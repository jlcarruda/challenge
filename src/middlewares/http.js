"use strict";

module.exports.configCors = function(ignore, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');
  next();
};