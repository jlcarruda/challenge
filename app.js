
require('dotenv').config();
const Server = require('./src');

exports.init = (cb) => {
  Server(cb).catch( (e) => {
    console.log(`Server had trouble when starting: ${e.message}`);
    cb(e);
  });
};