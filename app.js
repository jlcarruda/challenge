
require('dotenv').config();
const Server = require('./src');

module.exports = (() => {
  Server().catch( (e) => {
    console.log(`Server had trouble when starting: ${e.message}`);
  });
})();