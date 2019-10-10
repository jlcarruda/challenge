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

module.exports.verifyJwt = async (token) => {
  return new Promise((resolve, reject) => {
    if (token === undefined) return resolve(false);
    try {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          if (err.name == 'TokenExpiredError') return resolve(false);
          return reject(err);
        }

        resolve(decoded);
      });
    } catch(err) {
      reject(err);
    }
  });
};