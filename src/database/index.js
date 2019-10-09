const { MongoMemoryServer } =  require('mongodb-memory-server');
const mongoose = require('mongoose');

module.exports.connect = () => {
  "use strict";

  return new Promise((resolve, reject) => {
    getMongoUri().then((uri) => {
      mongoose.Promise = Promise;
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

      const conn = mongoose.connection;

      conn.on('error', err => {
        console.error.bind(console, `Database connection error: ${err.message}`);
        reject(err);
      });

      conn.once('open', resolve);
    });
  });
};

function getMongoUri() {
  return new Promise((resolve, reject) => {
    switch(process.env.NODE_ENV) {
      case 'production':
        resolve(process.env.MONGODB_URI);
        break;
      default:
       startMemoryDatabase().getConnectionString().then((uri) => {
          resolve(uri);
        }).catch(e => {
          reject(e);
        });
    }
  });
}

function startMemoryDatabase() {
  return new MongoMemoryServer({
    dbName: (process.env.NODE_ENV === 'development') ? 'dev' : 'test'
  });
}

module.exports.getMongoUri = getMongoUri;

if (process.env.NODE_ENV === 'test') {
  module.exports.startMemoryDatabase = startMemoryDatabase;
}