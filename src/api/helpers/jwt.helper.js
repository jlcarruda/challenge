const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

module.exports.generateJwt = (objectToHash, expiresIn) => {
  return new Promise( (resolve, reject) => {
    jwt.sign(objectToHash, SECRET, { expiresIn: expiresIn }, (err, token) => {
      if (err) return reject(err);

      resolve(token);
    });
  });
};

module.exports.verifyJwt = token => {
  return new Promise((resolve, reject) => {
    if (token === undefined) return resolve(false);
    try {
      let decoded = jwt.verify(token, SECRET);
      resolve(decoded);
    } catch(err) {
      reject(err);
    }
  });
};