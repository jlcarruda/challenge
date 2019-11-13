const app = require('./api');
const database = require('./database');

module.exports = function() {
  'use strict';

  return app.init()

  // return database.connect()
  //   .then(app.init(cb))
  //   .catch(e => {
  //     console.log(`Error while connection to database: ${e.message}`);
  //     cb(e);
  //   });
};