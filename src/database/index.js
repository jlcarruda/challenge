const mongoose = require('mongoose');
const path = require('path');

module.exports.connect = () => {
  "use strict";

  return new Promise((resolve, reject) => {
    const databaseUri = getMongoUri();
    mongoose.Promise = Promise;
    mongoose.connect(databaseUri, { useNewUrlParser: true, useUnifiedTopology: true });

    const conn = mongoose.connection;

    conn.on('error', err => {
      console.error.bind(console, `connection error: ${err.message}`);
      reject(err);
    });

    conn.once('open', resolve);
  });
};

function getMongoUri() {
  switch(process.env.NODE_ENV) {
    case 'production':
      return process.env.MONGODB_URI;
    case 'test':
      return process.env.MONGOLAB_TEAL_URI;
    default:
      return process.env.MONGOLAB_ONYX_URI;
  }
}