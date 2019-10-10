require('dotenv').config();
const jwt = require('jsonwebtoken');
const { verifyJwt } = require('../../src/api/helpers/jwt.helper');

describe('verifyJwt', () => {
  let payload = { foo: "bar" };
  let secret = process.env.JWT_SECRET;

  it('should verify correctly healthy JWT', async () => {
    jwt.sign(payload, secret, { expiresIn: "1h" }, (err, token) => {

      expect(err).toBeNull();
      expect(verifyJwt(token)).resolve.toEqual(true);
    });
  });

  it('should safe fail when verifying an expires JWT', async () => {
    jwt.sign(payload, secret, { expiresIn: "1s" },  (err, token) => {
      expect(err).toBeNull();

      setTimeout( () => {
        expect(verifyJwt(token)).resolve.toEqual(false);
      }, 1100);
    });
  });

  it('should safe fail when verifying an expires JWT with async/ syntax', async () => {
    jwt.sign(payload, secret, { expiresIn: "1s" }, (err, token) => {
      expect(err).toBeNull();

      setTimeout( async () => {
        let decode = await verifyJwt(token);
        console.log(decode);

        expect(decode).toBeFalsy();
      }, 1100);
    });
  });
});