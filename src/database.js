
const mongoose = require('mongoose');

module.exports.connect = () => {
  "use strict";

  return new Promise((resolve, reject) => {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const conn = mongoose.connection;

    conn.on('error', err => {
      console.error.bind(console, `connection error: ${err.message}`);
      reject(err);
    });

    conn.once('open', () => {
      console.log('Database Connected...');

      resolve();
    });
  });
};