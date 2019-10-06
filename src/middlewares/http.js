
module.exports.configCors = (ignore, res, next) => {
  'use strict';

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');
  next();
};