const errors = require('common-errors');

module.exports.AuthenticationFailedError = errors.helpers.generateClass("AuthenticationFailedError", {
  generateMessage: () => "Authentication Failed"
});