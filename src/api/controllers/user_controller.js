const validator = require('express-joi-validator');
const Joi = require('joi');

module.exports = (express) => {

  const router = express.Router();

  router.get('/', (req, res) => {
    res.send("Got it");
  });

  router.post('/sign_in', validator({
    body: {
      email: Joi.string().required(),
      senha: Joi.string().required()
    }
  }), (req, res) => {
    res.send("Got it");
  });

  router.post('/sign_up', (req, res) => {
    res.send("Got it");
  });

  router.use((err, req, res, next) => {
    if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output.payload);
    }
    next();
  });

  return router;
};