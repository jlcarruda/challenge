const passport = require('passport');
const jwt = require('passport-jwt');
const { AuthenticationFailedError } = require('../errors');
const UserModel = require('../../database/models/user');
const ExtractJwt = jwt.ExtractJwt;
const Strategy = jwt.Strategy;

module.exports = (() => {
  let strategyOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  let strategy = new Strategy(strategyOptions, (payload, done) => {
    UserModel.findById(payload.id, (err, user)  => {
      if (user) {
        user.updateOne({ ultimo_login: Date.now }, (err) => {
          if (err) return done(err);

          done(null, { id: user.id });
        });
      } else {
        done(new AuthenticationFailedError());
      }
    });
  });

  passport.use(strategy);

  return {
    initialize: () => { return passport.initialize(); },
    authenticate: () => { return passport.authenticate('jwt', { session: false }); }
  };
})();

