
require('dotenv').config();
const Server = require('./src');

exports.init = (cb) => {
  Server().then(() => {
    console.log("Server Up and Running!");
  }).catch( (e) => {
    console.log(`Server had trouble when starting: ${e.message}`);
    cb(e);
  });
};