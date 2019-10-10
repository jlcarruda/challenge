

const { check } = require('express-validator');

const jwtAuth = require("../auth/jwt.auth");
const UserModel = require('../../database/models/user');
const { verifyJwt } = require('../helpers/jwt.helper');
const { userSignIn } = require('../helpers/user.helper');
const { InvalidSessionError, InternalServerError, ConflictError, NotAuthorizedError } = require('../errors');

module.exports = (express) => {

  const router = express.Router();

  router.get('/:user_id', jwtAuth.authenticate, (req, res) => {
    if (req.params.user_id === undefined || req.user === undefined) return NotAuthorizedError(res, "Não Autorizado");

    if (req.user.id === req.params.user_id) {
      return verifyJwt(req.user.token).then(isValid => {
        if (!isValid) return InvalidSessionError(res);

        res.send(req.user);
      });
    }
  });

  router.post('/sign_in', [
      check('email').isEmail(),
      check('senha').isString()
    ], (req, res) => {

    UserModel.findOne({
      email: req.body.email
    }).then( async (user) => {
      if (user != undefined) {
        let validatePassword = await user.comparePassword(req.body.senha);
        if (validatePassword === true) return userSignIn(res, user);
      }

      NotAuthorizedError(res, "Usuário e/ou Senha inválidos");
    });

  });

  router.post('/sign_up', [
      check("nome").isString(),
      check("email").isEmail(),
      check("senha").isString(),
      check("telefones").isArray()
  ], (req, res) => {
    UserModel.findOne({ email: req.body.email }).then((u) => {
      if (u) return ConflictError(res, "Email já existente");

      UserModel.create(req.body, (err, user) => {
        if (err) return InternalServerError(res);
        if (user) userSignIn(res, user, 201);
      });
    });
  });

  return router;
};
